import React from 'react'
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from 'react-router-dom'
import axios from 'axios'

// localStorage.setItem('token', someTokenFromServer)
// localStorage.removeItem('token')
// const headers = { 'Authorization': `Bearer ${token}` }
// axios.put('/api/auth', data, {headers: headers})

class App extends React.Component {

  state = {
    error: '',
    username: ''
  }
  
  handleForm = event => {
    event.preventDefault()
    const data = {
      username: this.username.value,
      password: this.password.value
    }
    this.action.value === 'Register'
    ? this.handleRegister(data)
    : this.handleLogin(data)
  }
  
  handleRegister = data => {
    axios.post('/api/auth', data)
    .then(res => {
      res.data.success
      ? this.handleLogin(res.data)
      : this.handleError(res.data.message)
    })
    .catch(err => console.log(err))
  }
  
  handleLogin = data => {
    if (data.token) localStorage.setItem('token', data.token)
    else {
      axios.put('/api/auth', data)
      .then(res => {
        res.data.success
        ? this.handleLogin(res.data)
        : this.handleError(res.data.message)
      })
      .catch(err => console.log(err))
    }
  }
  
  handleError = message => {
    this.setState({error: message})
    setTimeout(() => this.setState({error: ''}), 3000)
  }
  
  Form = props => {
    return (
      <form onSubmit={this.handleForm}>
      <h2>{props.title}</h2>
      <div><label>Username: <input ref={node => this.username = node}/></label></div>
      <div><label>Password: <input ref={node => this.password = node} type="password"/></label></div>
      <div>
        <input type="submit" ref={node => this.action = node} value={props.title}/>
        <span style={{color: 'red', fontSize: 10}}> {this.state.error}</span>
        </div>
      </form>
    )
  }
  
  Login = () => <this.Form title="Login" />
  Register = () => <this.Form title="Register" />
  Members = () => <h2>You made it!</h2>

  PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
      localStorage.getItem('token')
      ? <Component {...props}/>
      : <Redirect to={{pathname: '/',}}/>
    )}/>
  )

  Logout = withRouter(({ history }) => (
    <button
      onClick={() => {
        localStorage.removeItem('token')
        history.push('/')
      }}
    >Log Out</button>
  ))

  render() {
    return (
    <Router>
      <div>
        <div>{
          localStorage.getItem('token')
          ? (<nav>
            <Link to="/members">Members</Link>&nbsp; | &nbsp;
            <this.Logout/>
            </nav>)
          : (<nav>
            <Link to="/">Login</Link>&nbsp; | &nbsp;
            <Link to="/register">Register</Link>
            </nav>)
        }</div>
        <hr/>
        <Route path="/" exact={true} component={this.Login}/>
        <Route path="/register" component={this.Register}/>
        <this.PrivateRoute path="/members" component={this.Members}/>
      </div>
    </Router>
    )
  }
}

export default App