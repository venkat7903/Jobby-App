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
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="header-website-logo"
          />
        </Link>
        <ul className="mobile-nav-links-container">
          <Link to="/">
            <li>
              <IoMdHome className="nav-icon" />
            </li>
          </Link>
          <Link to="/jobs">
            <li>
              <BsBriefcaseFill className="nav-icon" />
            </li>
          </Link>
          <li>
            <button
              type="button"
              className="logout-btn"
              onClick={onClickLogout}
            >
              <FiLogOut className="nav-icon" />
            </button>
          </li>
        </ul>
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
