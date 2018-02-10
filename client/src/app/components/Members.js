import React from 'react'
import axios from 'axios'

// On mount of protected route:
// If token is found, headers will be set for all requests
// If token is not found, auth headers will be deleted
// Axios will request private data using stored token
// JWT will decode token and use it to query MongoDB for data
// In this case, data is just a username
class Members extends React.Component {

  state = { username: '' }

  componentDidMount() {
    const token = localStorage.getItem('token')
    const headers = {'x-access-token': token}
    if (token) axios.defaults.headers.common['x-access-token'] = token
    else delete axios.defaults.headers.common['x-access-token']
    axios.get('/api/members')
    .then(res => this.setState({username: res.data.username}))
    .catch(err => console.log(err))
  }
  
  render() {
    return <h2>Welcome, {this.state.username}!</h2>
  }
}

export default Members