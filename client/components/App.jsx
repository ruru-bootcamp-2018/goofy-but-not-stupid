import React from 'react'
import {getUsers, getUserData, getTeams} from '../apiClient'
import User from './User'


class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
       users: [],
       activeUser: {}
    }

    this.userClick = this.userClick.bind(this);
  }

  componentDidMount () {
    getUsers()
      .then((res) => {
        // console.log(res)
        this.setState({
          users: res.users
        })
      })
  }

  userClick (name) {
    console.log(`clicked ${name}`)
    // console.log(this.state.users)
    getUserData(name)
      .then((finalData) => {
        this.setState({
          activeUser: finalData
        })
        // console.log({finalData})
        //something with the pairings
      })
  }

  generateTeam() {
    getTeams()
      .then((teams) => {
        console.log(teams)
      })
    // call client api
  }


  render () {
    return (
      <div className='app'>
        <h1>Don't H8 Gener8</h1>
        <ul>
          {this.state.users.map((user) => {
            return <li onClick={() => this.userClick(user.name)}><a href="#">{user.name}</a></li>
          })}
        </ul>

        <button onClick={this.generateTeam}>Bing Bang booP gimme a team</button>

        {this.state.activeUser.name && <User user={this.state.activeUser}/>}
      </div>
    )
  }
}

// component to render all a users relevant data after click

export default App