import React from 'react'

import {getUsers} from '../apiClient'

class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
       users: []
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
    getPairings(name)
      .then((pairings) => {
        //something with the pairings
      })
  }


  render () {
    return (
      <div className='app'>
        <h1>Don't H8 Gener8</h1>
        <ul>
          {this.state.users.map((user) => {
            return <li>{user.name}</li>
          })}
        </ul>
        <button onClick={() => this.userClick('Dan')}>Test Dan</button>
      </div>
    )
  }
}

export default App
