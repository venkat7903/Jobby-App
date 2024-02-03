import {Component} from 'react'
import Cookies from 'js-cookie'
import {MdStar, MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FaExternalLinkAlt} from 'react-icons/fa'
import Loader from 'react-loader-spinner'

import Header from '../Header'

import './index.css'

const apisStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
}

const getFormattedData = data => ({
  companyLogoUrl: data.company_logo_url,
  companyWebsiteUrl: data.company_website_url,
  employmentType: data.employment_type,
  id: data.id,
  jobDescription: data.job_description,
  skills: data.skills,
  lifeAtCompany: data.life_at_company,
  imageUrl: data.image_url,
  name: data.name,
  description: data.description,
  location: data.location,
  packagePerAnnum: data.package_per_annum,
  rating: data.rating,
  similarJobs: data.similar_jobs,
  title: data.title,
})

class JobItemDetails extends Component {
  state = {
    jobDetails: {skills: [], lifeAtlifeAtCompany: {}},
    apiStatus: apisStatusConstants.initial,
    similarJobs: [],
  }

  componentDidMount() {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({apiStatus: apisStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params

    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)

    if (response.ok === true) {
      const data = await response.json()
      const jobData = data.job_details
      const formattedData = {
        ...getFormattedData(jobData),
        skills: jobData.skills.map(each => getFormattedData(each)),
        lifeAtCompany: getFormattedData(jobData.life_at_company),
      }
      const similarJobs = data.similar_jobs.map(each => getFormattedData(each))
      console.log(formattedData)
      console.log(similarJobs)
      this.setState({
        apiStatus: apisStatusConstants.success,
        jobDetails: formattedData,
        similarJobs,
      })
    } else {
      this.setState({apiStatus: apisStatusConstants.failure})
    }
  }

  onClickRetry = () => {
    this.getJobDetails()
  }

  renderSkills = () => {
    const {jobDetails} = this.state
    const {skills} = jobDetails

    return (
      <div>
        <h1 className="job-desc-title">Skills</h1>
        <ul className="skills-list">
          {skills.map(each => (
            <li className="skill-item" key={each.name}>
              <img src={each.imageUrl} alt={each.name} className="skill-img" />
              <p className="skill-name">{each.name}</p>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  renderLifeAtCompany = () => {
    const {jobDetails} = this.state
    const {lifeAtCompany} = jobDetails
    const {description, imageUrl} = lifeAtCompany

    return (
      <div>
        <h1 className="job-desc-title">Life at Company</h1>
        <div className="life-at-com-desc-img-container">
          <p className="job-desc">{description}</p>
          <img
            src={imageUrl}
            alt="life at company"
            className="life-at-company-img"
          />
        </div>
      </div>
    )
  }

  renderSimilarJobs = () => {
    const {similarJobs} = this.state
    return (
      <div className="similar-jobs-container">
        <h1 className="job-desc-title">Similar Jobs</h1>
        <ul className="similar-jobs-list">
          {similarJobs.map(each => {
            const {
              companyLogoUrl,
              employmentType,
              id,
              jobDescription,
              location,
              rating,
              title,
            } = each
            return (
              <li className="similar-job-item" key={id}>
                <div className="company-logo-rating-title-container">
                  <img
                    src={companyLogoUrl}
                    alt="company logo"
                    className="company-logo"
                  />
                  <div className="name-rating-container">
                    <h1 className="company-title">{title}</h1>
                    <div className="rating-container">
                      <MdStar className="star-icon" />
                      <p className="rating-count">{rating}</p>
                    </div>
                  </div>
                </div>
                <div className="desc-com-web-url-container">
                  <h1 className="job-desc-title similar-job-desc">
                    Description
                  </h1>
                </div>
                <p className="job-desc">{jobDescription}</p>
                <div className="loc-type-container">
                  <div className="info-container">
                    <MdLocationOn className="job-icon similar-job-icon" />
                    <p className="info">{location}</p>
                  </div>
                  <div className="info-container">
                    <BsBriefcaseFill className="job-icon similar-job-icon" />
                    <p className="info">{employmentType}</p>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  renderJobDetails = () => {
    const {jobDetails} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
    } = jobDetails
    return (
      <>
        <div className="job-item item-details">
          <div className="company-logo-rating-title-container">
            <img
              src={companyLogoUrl}
              alt="company logo"
              className="company-logo"
            />
            <div className="name-rating-container">
              <h1 className="company-title">{title}</h1>
              <div className="rating-container">
                <MdStar className="star-icon" />
                <p className="rating-count">{rating}</p>
              </div>
            </div>
          </div>
          <div className="location-type-lpa-container">
            <div className="loc-type-container">
              <div className="info-container">
                <MdLocationOn className="job-icon" />
                <p className="info">{location}</p>
              </div>
              <div className="info-container">
                <BsBriefcaseFill className="job-icon" />
                <p className="info">{employmentType}</p>
              </div>
            </div>
            <p className="package-per-annum">{packagePerAnnum}</p>
          </div>
          <hr className="job-field-horizontal-line job-detail-horizon" />
          <div>
            <div className="desc-com-web-url-container">
              <h1 className="job-desc-title">Description</h1>
              <a href={companyWebsiteUrl} className="company-url">
                Visit
                <FaExternalLinkAlt className="anchor-link" />
              </a>
            </div>
            <p className="job-desc">{jobDescription}</p>
          </div>
          {this.renderSkills()}
          {this.renderLifeAtCompany()}
        </div>
        {this.renderSimilarJobs()}
      </>
    )
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="jobs-failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="jobs-failure-view-img"
      />
      <h1>Oops! Somethings Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button type="button" className="retry-btn" onClick={this.onClickRetry}>
        Retry
      </button>
    </div>
  )

  renderViews = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apisStatusConstants.success:
        return this.renderJobDetails()
      case apisStatusConstants.inProgress:
        return this.renderLoader()
      case apisStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="job-details-failure-loader-container">
          {this.renderViews()}
        </div>
      </>
    )
  }
}

export default JobItemDetails
