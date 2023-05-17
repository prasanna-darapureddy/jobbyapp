import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const onClickLogout = () => {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      Cookies.remove('jwt_token')
      const {history} = props
      history.replace('/login')
    }
  }

  return (
    <>
      <div className="header-container">
        <nav className="head-nav-container">
          <Link to="/" className="linked-web-logo">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="logo-img"
            />
          </Link>
          <ul className="nav-items-container">
            <li className="nav-item">
              <Link to="/" className="linked-nav-item">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/jobs" className="linked-nav-item">
                Jobs
              </Link>
            </li>
          </ul>
          <button
            type="button"
            className="logout-button"
            onClick={onClickLogout}
          >
            Logout
          </button>
        </nav>
      </div>
    </>
  )
}
export default withRouter(Header)
