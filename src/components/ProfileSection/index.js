import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import './index.css'

const apisStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
}

class ProfileSection extends Component {
  state = {profileDetails: {}, apiStatus: apisStatusConstants.initial}

  componentDidMount() {
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    this.setState({apiStatus: apisStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)

    if (response.ok === true) {
      const data = await response.json()
      const profileData = data.profile_details
      const formattedData = {
        name: profileData.name,
        profileImageUrl: profileData.profile_image_url,
        shortBio: profileData.short_bio,
      }
      this.setState({
        apiStatus: apisStatusConstants.success,
        profileDetails: formattedData,
      })
    } else {
      this.setState({apiStatus: apisStatusConstants.failure})
    }
  }

  renderProfileSuccess = () => {
    const {profileDetails} = this.state
    const {name, profileImageUrl, shortBio} = profileDetails

    return (
      <div className="profile-section-container">
        <img src={profileImageUrl} alt="profile" className="profile-img" />
        <h1 className="profile-name">{name}</h1>
        <p className="profile-bio">{shortBio}</p>
      </div>
    )
  }

  renderLoading = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onClickRetry = () => {
    this.getProfileDetails()
  }

  renderFailureView = () => (
    <div className="failure-container">
      <button
        type="button"
        className="profile-sec-retry-btn"
        onClick={this.onClickRetry}
      >
        Retry
      </button>
    </div>
  )

  renderProfileSectionViews = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apisStatusConstants.success:
        return this.renderProfileSuccess()
      case apisStatusConstants.inProgress:
        return this.renderLoading()
      case apisStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="profile-section-view-container">
        {this.renderProfileSectionViews()}
      </div>
    )
  }
}

export default ProfileSection
