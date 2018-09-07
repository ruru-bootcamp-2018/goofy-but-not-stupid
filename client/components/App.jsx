import React from 'react'
import { HashRouter as Router, Route } from 'react-router-dom'

import Home from './Home'
import HomeTeams from './HomeTeams'
import Login from './Login'
import Register from './Register'
import Nav from './Nav'
import Profile from './Profile'
import PreviousTeams from './PreviousTeams'
import Relationships from './Relationships'

const App = () => {
  return (
    <Router>
      <div className='app'>
        <Nav />
        <Route exact path='/' component={Home} />
        <Route exact path='/profile' component={Profile} />
        <Route exact path='/teams' component={HomeTeams} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        <Route exact path='/previousTeams' component={PreviousTeams} />
        <Route exact path='/relationships' component={Relationships} />
      </div>
    </Router>
  )
}

export default App
