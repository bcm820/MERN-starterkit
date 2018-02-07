import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

// localStorage.setItem('token', someTokenFromServer)
// localStorage.removeItem('token')
// const headers = { 'Authorization': `Bearer ${token}` }

const register = () => {
  //
}

const login = () => {
  //
}

const Home = () => {
  return (
    <div>
      <h2>Home</h2>
      <p>Use the links above to register or login.</p>
    </div>
  )
}

const Form = props => {
  return (
    <form onSubmit={props.submit}>
    <h2>{props.title}</h2>
    <div><label>Name: <input/></label></div>
    <div><label>Password: <input type="password"/></label></div>
    <div><button>{props.action}</button></div>
    </form>
  )
}

const Register = () => <Form submit={register} title="Register" action="Register" />
const Login = () => <Form submit={login} title="Login" action="Login" />

const App = () => (
  <Router>
    <div>
      <nav>
        <a><Link to="/">Home</Link> | </a>
        <a><Link to="/register">Register</Link> | </a>
        <a><Link to="/login">Login</Link></a>
      </nav>
      <hr/>
      <Route exact path="/" component={Home}/>
      <Route path="/register" component={Register}/>
      <Route path="/login" component={Login}/>
    </div>
  </Router>
)

export default App