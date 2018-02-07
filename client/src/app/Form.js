import React from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'

class Form extends React.Component {

    state = {
        error: '',
        redirect: false
    }

    submitForm = event => {
        event.preventDefault()
        const data = {
          username: this.username.value,
          password: this.password.value
        }
        this.action.value === 'Register'
        ? this.register(data)
        : this.login(data)
    }
      
    register = data => {
      axios.post('/api/auth', data)
      .then(res => {
        res.data.success
        ? this.login(res.data)
        : this.showError(res.data.message)
      })
      .catch(err => console.log(err))
    }
      
    login = data => {
      if (data.token) {
        localStorage.setItem('token', data.token)
        this.setState({redirect: true})
      }
      else {
        axios.put('/api/auth', data)
        .then(res => {
          res.data.success
          ? this.login(res.data)
          : this.showError(res.data.message)
        })
        .catch(err => console.log(err))
      }
    }
    
    showError = message => {
      this.setState({error: message})
      setTimeout(() => this.setState({error: ''}), 3000)
    }

    render = props => {
        const {loggedIn} = this.state
        if (loggedIn) {
            this.setState({redirect: false})
            return <Redirect to={{pathname: '/members'}}/>
        }
        return (
        <form onSubmit={this.submitForm}>
            <h2>{this.props.title}</h2>
            <div><label>Username: <input ref={node => this.username = node}/></label></div>
            <div><label>Password: <input ref={node => this.password = node} type="password"/></label></div>
            <div>
                <input type="submit" ref={node => this.action = node} value={this.props.title}/>
                <span style={{color: 'red', fontSize: 10}}> {this.state.error}</span>
            </div>
        </form>
      )
    }
}

export default Form