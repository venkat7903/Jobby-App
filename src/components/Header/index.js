/* eslint-disable jsx-a11y/control-has-associated-label */
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import {IoMdHome} from 'react-icons/io'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="header-container">
      <nav className="nav-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="header-website-logo"
        />
        <div className="mobile-nav-links-container">
          <Link to="/">
            <IoMdHome className="nav-icon" />
          </Link>
          <Link to="/jobs">
            <BsBriefcaseFill className="nav-icon" />
          </Link>
          <button type="button" className="logout-btn" onClick={onClickLogout}>
            <FiLogOut className="nav-icon" />
          </button>
        </div>
        <div className="desktop-nav-links-container">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/jobs" className="nav-link">
            Jobs
          </Link>
        </div>
        <div className="desktop-logout-btn-container">
          <button
            type="button"
            className="desktop-logout-btn"
            onClick={onClickLogout}
          >
            Logout
          </button>
        </div>
      </nav>
    </div>
  )
}

export default withRouter(Header)
