import React from 'react'
import { Link } from 'react-router-dom'

// If token is stored, nav menu shows links to protected route and logout
// If token is not stored, nav menu shows links to login and register
// Logout simply deletes stored token
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

// Interestingly, if this function is rendered directly
// it is called instantly, causing a removal of the token
// even if it's attached to the onClick action
// So store it in a function, not as its own invocation!
const logout = () => localStorage.removeItem('token')

export default Nav