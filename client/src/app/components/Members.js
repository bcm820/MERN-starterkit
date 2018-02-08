import React from 'react'
import axios from 'axios'

class Members extends React.Component {

  // On mount of protected route:
  // Axios will request private data using stored token
  // JWT will decode token and use it to query MongoDB for data
  // In this case, data is just a username
  
  state = { username: '' }

  componentDidMount() {
    const token = localStorage.getItem('token')
    const headers = {'x-access-token': token}
    axios.get('/api/members', {headers: headers})
    .then(res => this.setState({username: res.data.username}))
    .catch(err => console.log(err))
  }
  
  render() {
    return <h2>Welcome, {this.state.username}!</h2>
  }
}

export default Members