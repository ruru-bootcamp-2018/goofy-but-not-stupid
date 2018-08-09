import React from 'react'
import {HashRouter as Router, Route} from 'react-router-dom'

import Home from './Home'
import HomeTeams from './HomeTeams'
import Login from './Login'
import Register from './Register'
import Nav from './Nav'

///

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }

  }


  render()  {
    return (
      <Router>
        <div className='app'>
        <Nav />
        <Route exact path='/' component={Home} />
        <Route exact path='/teams' component={HomeTeams} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        </div>
      </Router>
    )
  }
}


export default App
