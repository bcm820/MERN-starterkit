import React from 'react'
import axios from 'axios'

class Members extends React.Component {

  state = { username: '' }

  componentDidMount() {
    const token = localStorage.getItem('token')
    const headers = {'x-access-token': token}
    axios.get('/api/members', {headers: headers})
    .then(res => {
      if (typeof res.data === 'string')
        this.setState({username: res.data})
      else console.log(res.data)
    })
    .catch(err => console.log(err))
  }
  
  render() {
    return <h2>Welcome, {this.state.username}!</h2>
  }
}

export default Members