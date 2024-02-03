import {Link} from 'react-router-dom'
import {MdStar, MdLocationOn} from 'react-icons/md'

import {BsBriefcaseFill} from 'react-icons/bs'

import './index.css'

const JobItem = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobDetails

  return (
    <Link to={`/jobs/${id}`} className="job-link">
      <li className="job-item">
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
        <hr className="job-field-horizontal-line" />
        <div>
          <h1 className="job-desc-title">Description</h1>
          <p className="job-desc">{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}

export default JobItem
