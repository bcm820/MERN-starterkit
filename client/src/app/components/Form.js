import React from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

class Form extends React.Component {

  state = {
    error: '',
    redirect: false
  }

  // If form used to register, POST request sent to server
  // Server responds with token for automatic login
  // Login function called to store generated token locally
  // If form used to login, PUT request sent to request token
  // If token received, stored locally
  // Updating state.redirect triggers re-render with <Redirect>

  submitForm = event => {
      event.preventDefault()
      const data = {
        username: this.username.value,
        password: this.password.value
      }
      this.action.value === 'Register'
      ? this.register(data)
      : this.login(data)
  }
      
  register = data => {
    axios.post('/api/auth', data)
    .then(res => {
      res.data.success
      ? this.login(res.data)
      : this.showError(res.data.message)
    })
    .catch(err => console.log(err))
  }
      
  login = data => {
    if (data.token) {
      localStorage.setItem('token', data.token)
      this.setState({redirect: true})
    } else {
      axios.put('/api/auth', data)
      .then(res => {
        res.data.success
        ? this.login(res.data)
        : this.showError(res.data.message)
      })
      .catch(err => console.log(err))
    }
  }
    
  showError = message => {
    this.setState({error: message})
    setTimeout(() => this.setState({error: ''}), 3000)
  }

  render = props => {
    return (
      <form onSubmit={this.submitForm}>
          <h2>{this.props.title}</h2>
          <div>
            <label>Username: <input ref={node => this.username = node}/></label>
          </div>
          <div>
            <label>Password: <input ref={node => this.password = node}type="password"/></label>
          </div>
          <div>
              <input type="submit" ref={node => this.action = node} value={this.props.title}/>
              <span style={{ color: 'red', fontSize: 10 }}> {this.state.error} </span>
          </div>
          {this.state.redirect && <Redirect to={'/members'}/>}
      </form>
    )
  }
}

export const Login = () => <Form title="Login" />
export const Register = () => <Form title="Register" />