import React from 'react'
import { Link } from 'react-router-dom'

const logout = () => {
  localStorage.removeItem('token')
  // send axios request to remove token
}

const Nav = () => {
  return <div>
  {
    localStorage.getItem('token')
    ? (<nav>
      <Link to="/members">Members</Link>&nbsp; | &nbsp;
      <Link to="/" onClick={logout}>Logout</Link>
      </nav>)
    : (<nav>
      <Link to="/">Login</Link>&nbsp; | &nbsp;
      <Link to="/register">Register</Link>
      </nav>)
  }
  </div>
}

export default Nav