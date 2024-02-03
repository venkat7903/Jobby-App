import {Link} from 'react-router-dom'
import Header from '../Header'

import './index.css'

const Home = props => {
  const onClickFindJobs = () => {
    const {history} = props
    history.replace('/jobs')
  }
  return (
    <>
      <Header />
      <div className="home-route-container">
        <div className="sub-home-route-container">
          <h1 className="home-route-title">Find The Job That Fits Your Life</h1>
          <p className="home-route-desc">
            Millions of People are searching for jobs, salary information,
            company reviews. Find the job that fits your abilities and potential
          </p>
          <button
            type="button"
            className="find-job-btn"
            onClick={onClickFindJobs}
          >
            <Link to="/jobs" className="find-jobs-link">
              Find Jobs
            </Link>
          </button>
        </div>
      </div>
    </>
  )
}

export default Home
