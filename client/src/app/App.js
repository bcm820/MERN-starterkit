import React from 'react'
import { Route } from 'react-router-dom'

import Nav from './components/Nav'
import { Login, Register } from './components/Form'
import Members from './components/Members'
import PrivateRoute from './components/PrivateRoute'

const App = () => {
  return (
    <div>
      <Nav/><hr/>
      <Route exact path="/" component={Login}/>
      <Route path="/register" component={Register}/>
      <PrivateRoute path="/members" component={Members}/>
    </div>
  )
}

export default App