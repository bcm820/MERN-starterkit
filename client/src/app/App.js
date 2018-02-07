import React from 'react'
import {
  BrowserRouter as Router,
  Route, Link, Redirect
  } from 'react-router-dom'
import axios from 'axios'
import Form from './Form'


const Login = () => <Form title="Login" />
const Register = () => <Form title="Register" />
const Members = () => <h2>Welcome, member!</h2>

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    localStorage.getItem('token')
    ? <Component {...props}/>
    : (<Redirect to={{
        pathname: '/',
        state: {from: props.location}
      }}/>)
  )}/>
)

const logout = () => {
  localStorage.removeItem('token')
  // send axios request to remove token
}

class App extends React.Component {

  render() {
    const token = localStorage.getItem('token')
    const headers = {'x-access-token': token}
    
    // i can't get GET method to work for proxy
    
    axios.get('/api/auth', {headers: headers})
    .then(res => console.log(res.data))
    .catch(err => console.log(err))
    return (
    <Router>
      <div>
        <div>{
          localStorage.getItem('token')
          ? (<nav>
            <Link to="/members">Members</Link>&nbsp; | &nbsp;
            <Link to="/" onClick={logout}>Logout</Link>
            </nav>)
          : (<nav>
            <Link to="/">Login</Link>&nbsp; | &nbsp;
            <Link to="/register">Register</Link>
            </nav>)
        }</div>
        <hr/>
        <Route path="/" exact={true} component={Login}/>
        <Route path="/register" component={Register}/>
        <PrivateRoute path="/members" component={Members}/>
      </div>
    </Router>
    )
  }

}

export default App