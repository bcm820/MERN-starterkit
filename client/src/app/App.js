import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

const Home = () => <h2>Root</h2>
const About = () => <h2>About</h2>

const Topics = ({ match }) => (
  <div>
    <h2>Topics</h2>
    <ul>
      <li><Link to={`${match.url}/topic1`}>/topic1</Link></li>
      <li><Link to={`${match.url}/topic2`}>/topic2</Link></li>
      <li><Link to={`${match.url}/topic3`}>/topic3</Link></li>
    </ul>
    <hr/>
    <Route path={`${match.url}/:anyIdYouWant`} component={Topic}/>
    <Route exact path={match.url} render={() => <h3>Select a topic.</h3>}/>
  </div>
)

const Topic = ({ match }) => {
  switch (match.params.anyIdYouWant) {
    case 'topic1': return <h3>This is the first topic</h3>
    case 'topic2': return <h3>This is the second topic</h3>
    case 'topic3': return <h3>This is the third topic</h3>
    default: return <h3>Error 404!</h3>
  }
}

const App = () => (
  <Router>
    <div>
      <ul>
        <li><Link to="/">/ (root)</Link></li>
        <li><Link to="/about">/about</Link></li>
        <li><Link to="/topics">/topics</Link></li>
      </ul>
      <hr/>
      <Route exact path="/" component={Home}/>
      <Route path="/about" component={About}/>
      <Route path="/topics" component={Topics}/>
    </div>
  </Router>
)

export default App