import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class LoginForm extends Component {
  state = {username: '', password: '', isErrorShows: false, errorMsg: ''}

  onChangeUserName = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.push('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({isErrorShows: true, errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()

    const {username, password} = this.state

    const userDetails = {username, password}

    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {username, password, errorMsg, isErrorShows} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <>
        <div className="login-page">
          <div className="login-card-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png "
              alt="website logo"
              className="logo-img"
            />
            <form className="form-container" onSubmit={this.onSubmitForm}>
              <label htmlFor="userName" className="label-text">
                USERNAME
              </label>
              <input
                type="text"
                id="userName"
                className="user-input"
                placeholder="Username"
                value={username}
                onChange={this.onChangeUserName}
              />
              <label htmlFor="password" className="label-text">
                PASSWORD
              </label>
              <input
                type="password"
                id="password"
                className="user-input"
                placeholder="Password"
                value={password}
                onChange={this.onChangePassword}
              />
              <button type="submit" className="login-button">
                Login
              </button>
              {isErrorShows ? <p className="error-text">{errorMsg}</p> : null}
            </form>
          </div>
        </div>
      </>
    )
  }
}
export default LoginForm
