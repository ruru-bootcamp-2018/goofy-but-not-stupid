import React from 'react'
import {getRandomName} from '../apiClient'

class Teams extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      teamNames: []
    }
  }

  componentDidMount () {
    getRandomName()
      .then((res) => {
        // console.log(res.nickname);
        let newTeamNames = this.state.teamNames
        newTeamNames.push(res.nickname)
        this.setState({
          teamNames: newTeamNames
        })
      })
      .then(() => {
        getRandomName()
          .then((res) => {
            // console.log(res.nickname);
            let newTeamNames = this.state.teamNames
            newTeamNames.push(res.nickname)
            this.setState({
              teamNames: newTeamNames
            })
          })
      })
      .then(() => {
        getRandomName()
          .then((res) => {
            // console.log(res.nickname);
            let newTeamNames = this.state.teamNames
            newTeamNames.push(res.nickname)
            this.setState({
              teamNames: newTeamNames
            })
          })
      })
  }

  // up to here - need this comp to call it's own teamnames with getTeamNames, then each team to print in a four col div
  render () {
    return (
        <React.Fragment>
          {this.state.teamNames && this.props.teams.map((team, i) => {
            return (
              <div className="four columns" key={i}>
                <br />
                <h1><strong>{this.state.teamNames[i]}</strong></h1>
                <br />
                  <ul>
                    {team.map((person) => {
                      return <li key={person}>{person}</li>
                    })}
                  </ul>
                <br />
              </div>
            )
          })}
        </React.Fragment>
    )
  }
}


export default Teams
