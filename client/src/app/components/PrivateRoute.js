import React from 'react'
import { Route, Redirect } from 'react-router-dom'

// PrivateRoute checks local storage for token from back-end
// If none found, automatic redirect to root (login page)
const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    localStorage.getItem('token')
    ? <Component {...props}/>
    : (
      <Redirect to={{
        pathname: '/',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

export default PrivateRoute