import React from 'react'
import {getUsers, getUserData, getTeams} from '../apiClient'
import User from './User'
import Teams from './Teams'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      users: []
    }

    this.userClick = this.userClick.bind(this);
    this.generateTeam = this.generateTeam.bind(this);
  }

  componentDidMount() {
    getUsers()
      .then((res) => {
        // console.log(res)
        this.setState({
          users: res.users
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
      .then((newTeams) => {
        console.log(newTeams)
        let namedTeams = newTeams.map((team) => {
          return team.map((id) => {
            let targetPerson = this.state.users.find((person) => {
              return (person.id == id)
            })
            return targetPerson.name
          })
        })
        console.log(namedTeams)

        this.setState({
          teams: namedTeams
        })
      })
    // call client api
  }


  render()  {
    return (
      <div className='app'>
        <section className="hero is-medium is-danger has-text-centered">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">
                DON'T H8, GENER8!
              </h1>
              <h2 className="subtitle">
                goofyButNotStupid
              </h2>
            </div>
          </div>
        </section>

        <div className='list'>
          <ul>
            {this.state.users.map((user) => {
              return <li onClick={() => this.userClick(user.name)}><a href="#">{user.name}</a></li>
            })}
          </ul>
        </div>
        <button onClick={this.generateTeam}>Bing Bang booP gimme a team</button>
        {this.state.activeUser && <User user={this.state.activeUser}/>}
        {this.state.teams && <Teams teams={this.state.teams}/>}
      </div>
    )
  }
}

// component to render all a users relevant data after click

export default App