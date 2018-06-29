import React from 'react'
import {getUsers, getUserData, getTeams, getRandomName} from '../apiClient'
import User from './User'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      users: [],
      activeUser: {},
      nameOne: '',
      nameTwo: '',
      nameThree: ''
    }

    this.userClick = this.userClick.bind(this);
  }

  componentDidMount() {
    getUsers()
      .then((res) => {
        // console.log(res)
        this.setState({
          users: res.users
        })
      })
      getRandomName()
      .then((res) => {
            console.log(res.nickname);
        this.setState({
          nameOne: res.nickname
        })
      })
      getRandomName()
      .then((res) => {
            console.log(res.nickname);
        this.setState({
          nameTwo: res.nickname
        })
      })
      getRandomName()
      .then((res) => {
            console.log(res.nickname);
        this.setState({
          nameThree: res.nickname
        })
      })
  }

  userClick(name) {
    console.log(`clicked ${name}`)
    // console.log(this.state.users)
    getUserData(name)
      .then((finalData) => {
        this.setState({
          activeUser: finalData
        })
        // console.log({finalData})
      })
  }

  generateTeam() {
    getTeams()
      .then((teams) => {
        console.log(teams)
      })
    // call client api
  }


  render() {
    return (
      <div className='app'>
        <section class="hero is-medium is-danger has-text-centered">
          <div class="hero-body">
            <div class="container">
              <h1 class="title">
                DON'T H8, GENER8!
      </h1>
              <h2 class="subtitle">
                goofyButNotStupid
      </h2>
            </div>
          </div>
        </section>
        <div>{this.state.nameOne},{this.state.nameTwo},{this.state.nameThree}</div>
        <div class='list'>
          <ul>
            {this.state.users.map((user) => {
              return <li onClick={() => this.userClick(user.name)}><a href="#">{user.name}</a></li>
            })}
          </ul>
        </div>
        <button onClick={this.generateTeam}>Bing Bang booP gimme a team</button>
        {this.state.activeUser.name && <User user={this.state.activeUser}/>}
      </div>
    )
  }
}

// component to render all a users relevant data after click

export default App
