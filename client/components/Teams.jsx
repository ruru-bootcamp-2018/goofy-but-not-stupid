import React from 'react'

class Teams extends React.Component {
  constructor(props) {
    super(props)
  }

  howMany() {
    if (this.props.teamNumber < 5) return String(Math.floor(this.props.teamNumber/12))
    else return '2'
  }

  render() {
    console.log(this.props.teams)
    return (
      <React.Fragment>
        {this.props.teamNames.length == this.props.teams.length && this.props.teams.map((teamObj, i) => {
          return (
            <div className={`column is-${this.howMany()}`} key={i}>
              <br />
              <h3 className='title is-3'><strong>{this.props.teamNames[i]}</strong></h3>
              <br />
              <ul>
                {teamObj.team.map((person) => {
                  return <li key={person.id}>{person.name}</li>
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