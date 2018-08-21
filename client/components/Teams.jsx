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
    if (this.props.teamNumber < 5) return String(Math.floor(this.props.teamNumber/12))
    else return '2'
    // if (this.props.teamNumber == 6) {
    //   return '2'
    // } 
    // else if (this.props.teamNumber == 5) {
    //   return '2'
    // } 
    // else if (this.props.teamNumber == 4) {
    //   return '3'
    // } 
    // else if (this.props.teamNumber == 3) {
    //   return '4'
    // } 
    // else if (this.props.teamNumber == 2) {
    //   return '6'
    // } 
  }



  render() {
    return (
      <React.Fragment>
        {this.state.teamNames && this.props.teams.map((team, i) => {
          return (
            <div className={`column is-${this.howMany()}`} key={i}>
              <br />
              <h3 className='title is-3'><strong>{this.state.teamNames[i]}</strong></h3>
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