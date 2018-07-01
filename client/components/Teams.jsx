import React from 'react'

class Teams extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      teamNames: []
    }
  }

  componentDidMount () {
    this.setState({
      teamNames: [this.props.teamNameOne, this.props.teamNameTwo, this.props.teamNameThree]
    })
  }

  // up to here - need this comp to call it's own teamnames with getTeamNames, then each team to print in a four col div
  render () {
    return (
        <React.Fragment>
          {this.state.teamNames && this.props.teams.map((team, i) => {
            return (
              <div className="four columns">
                <br />
                <h1>Team name: <strong>{this.state.teamNames[i]}</strong></h1>
                <br />
                  <ul>
                    {team.map((person) => {
                      return <li>{person}</li>
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