import React from 'react'

import { getUsers, getUserData } from '../apiClient'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      users: [],
      activeUser: {}
    }
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
    getUserData(name)
      .then((finalData) => {
        console.log({ finalData })
        //something with the pairings
      })
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

        <div class='list'>
          <ul>
            {this.state.users.map((user) => {
              return <li onClick={() => this.userClick(user.name)}><a href="#">{user.name}</a></li>
            })}
          </ul>
        </div>
      </div>
    )
  }
}

// component to render all a users relevant data after click

export default App