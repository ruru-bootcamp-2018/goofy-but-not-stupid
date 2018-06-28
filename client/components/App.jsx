import React from 'react'

import {getUsers, getUserData} from '../apiClient'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
       users: [],
       activeUser: {}
    }
  }

  componentDidMount () {
    getUsers()
      .then((res) => {
        console.log(res)
        this.setState({
          users: res.users
        })
      })
  }

  userClick (name) {
    console.log(`clicked ${name}`)
    getUserData(name)
      .then((data) => {
        //something with the pairings
      })
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
      </div>
    )
  }
}

// component to render all a users relevant data after click

export default App