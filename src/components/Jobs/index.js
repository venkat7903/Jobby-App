/* eslint-disable jsx-a11y/control-has-associated-label */
import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'

import ProfileSection from '../ProfileSection'
import Header from '../Header'
import FilterItems from '../FilterItems'
import JobItem from '../JobItem'

import './index.css'

const apisStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
}

const getFormattedData = data => ({
  companyLogoUrl: data.company_logo_url,
  employmentType: data.employment_type,
  id: data.id,
  jobDescription: data.job_description,
  location: data.location,
  packagePerAnnum: data.package_per_annum,
  rating: data.rating,
  title: data.title,
})

class Jobs extends Component {
  state = {
    apiStatus: apisStatusConstants.initial,
    searchInput: '',
    checksList: [],
    activeSalaryId: '',
    jobsList: [],
  }

  componentDidMount() {
    this.getJobsList()
  }

  getJobsList = async () => {
    this.setState({apiStatus: apisStatusConstants.inProgress})

    const {searchInput, checksList, activeSalaryId} = this.state
    const empTypesStr = checksList.join()
    console.log(checksList)
    console.log(empTypesStr)
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${empTypesStr}&minimum_package=${activeSalaryId}&search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)

    if (response.ok === true) {
      const data = await response.json()
      const jobsList = data.jobs
      const formattedJobsList = jobsList.map(each => getFormattedData(each))
      this.setState({
        apiStatus: apisStatusConstants.success,
        jobsList: formattedJobsList,
      })
    } else {
      this.setState({apiStatus: apisStatusConstants.failure})
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  updateChecksList = id => {
    const {checksList} = this.state
    console.log(id)
    console.log(checksList)
    if (checksList.includes(id)) {
      const filteredChecksList = checksList.filter(each => each !== id)
      this.setState({checksList: filteredChecksList}, this.getJobsList)
    } else {
      this.setState(
        prevState => ({checksList: [...prevState.checksList, id]}),
        this.getJobsList,
      )
    }
  }

  updateSalaryRange = id => {
    this.setState({activeSalaryId: id}, this.getJobsList)
  }

  onClickRetry = () => {
    this.getJobsList()
  }

  searchJobs = () => {
    this.getJobsList()
  }

  renderSearchBar = () => {
    const {searchInput} = this.state
    return (
      <>
        <div className="search-input-container">
          <input
            placeholder="Search"
            type="search"
            className="search-input"
            onChange={this.onChangeSearchInput}
            value={searchInput}
          />
          <button
            type="button"
            data-testid="searchButton"
            className="search-btn"
            onClick={this.searchJobs}
          >
            <BsSearch className="search-icon" />
          </button>
        </div>
      </>
    )
  }

  renderLoaderView = () => (
    <>
      {this.renderDesktopSearchBar()}
      <div className="jobs-loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="80" width="80" />
      </div>
    </>
  )

  renderDesktopSearchBar = () => {
    const {searchInput} = this.state
    return (
      <div className="desktop-search-input-container">
        <input
          placeholder="Search"
          type="search"
          className="search-input"
          onChange={this.onChangeSearchInput}
          value={searchInput}
        />
        <button
          type="button"
          data-testid="searchButton"
          className="search-btn"
          onClick={this.searchJobs}
        >
          <BsSearch className="search-icon" />
        </button>
      </div>
    )
  }

  renderJobsList = () => {
    const {jobsList} = this.state
    const showJobsList = jobsList.length > 1

    return (
      <>
        {this.renderDesktopSearchBar()}
        {showJobsList ? (
          <ul className="jobs-list">
            {jobsList.map(each => (
              <JobItem key={each.id} jobDetails={each} />
            ))}
          </ul>
        ) : (
          <div className="no-jobs-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
              alt="no jobs"
              className="no-jobs-img"
            />
            <h1 className="no-job-title">No Jobs Found</h1>
            <p className="no-jobs-desc">
              We could not find any jobs. Try other filters
            </p>
          </div>
        )}
      </>
    )
  }

  renderFailureView = () => (
    <>
      {this.renderDesktopSearchBar()}
      <div className="jobs-failure-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
          className="jobs-failure-view-img"
        />
        <h1>Oops! Something Went Wrong</h1>
        <p>We cannot seem to find the page you are looking for</p>
        <button type="button" className="retry-btn" onClick={this.onClickRetry}>
          Retry
        </button>
      </div>
    </>
  )

  renderJobSectionView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apisStatusConstants.success:
        return this.renderJobsList()
      case apisStatusConstants.inProgress:
        return this.renderLoaderView()
      case apisStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    const {activeSalaryId} = this.state
    return (
      <>
        <Header />
        <div className="jobs-route-container">
          <div className="sub-jobs-route-container">
            <div className="profile-and-filters-container">
              {this.renderSearchBar()}
              <ProfileSection />
              <hr className="horizontal-line" />
              <FilterItems
                updateChecksList={this.updateChecksList}
                updateSalaryRange={this.updateSalaryRange}
                activeSalaryId={activeSalaryId}
              />
            </div>
            <div className="jobs-views-container">
              {this.renderJobSectionView()}
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
