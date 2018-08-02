import React from 'react'
import { getRandomName } from '../apiClient'

class Teams extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount() {
    let teamNames = []

    for (let i = 0; i < this.props.teamNumber; i++) {
      getRandomName()
        .then((res) => {
          teamNames.push(res.nickname)
          teamNames.length == this.props.teamNumber
            && this.setState({
              teamNames
            })
        })
    }
  }

  howMany() {
    if (this.props.teamNumber == 6) {
      return 'two'
    } 
    else if (this.props.teamNumber == 5) {
      return 'two'
    } 
    else if (this.props.teamNumber == 4) {
      return 'three'
    } 
    else if (this.props.teamNumber == 3) {
      return 'four'
    } 
    else if (this.props.teamNumber == 2) {
      return 'six'
    } 
  }



  render() {
    return (
      <React.Fragment>
        {this.state.teamNames && this.props.teams.map((team, i) => {
          return (
            <div className={`${this.howMany()} columns`} key={i}>
              <br />
              <h3><strong>{this.state.teamNames[i]}</strong></h3>
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
