import React from 'react'
import {getUsers, getUserData, getTeams, getRandomName} from '../apiClient'
import User from './User'
import Teams from './Teams'


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      users: [],
      nameOne: '',
      nameTwo: '',
      nameThree: ''
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
        {
          !this.state.teams && 
            <div className='row'>
              <div className='twelve columns'>
                  <button className="btn btn--stripe btn--radius centered" onClick={this.generateTeam}><h1>DON'T H8, GENER8</h1></button>
              </div>
            </div>
        }
        <hr />

        <div className='row'>
          <div className='three columns'>
            <ul>
              {this.state.users.map((user) => {
                return <li onClick={() => this.userClick(user.name)}><a href="#">{user.name}</a></li>
              })}
            </ul>
          </div>

            {
              !this.state.activeUser &&
                <div className='nine columns'>
                  <img className='centered gif' src='https://media.giphy.com/media/3eP9HDIMwJVvGTdmNA/giphy.gif' />
                </div>
            }
            {
              this.state.activeUser && 
                <User user={this.state.activeUser}/>
            }

        </div>

        {this.state.teams && 
          <React.Fragment>
            <Teams teams={this.state.teams} teamNameOne={this.state.nameOne} teamNameTwo={this.state.nameTwo} teamNameThree={this.state.nameThree} />
          </React.Fragment>}
      </div>
    )
  }
}

// component to render all a users relevant data after click

export default App
