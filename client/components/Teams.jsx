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


  render () {
    return (
        <React.Fragment>
          {this.state.teamNames && this.props.teams.map((team, i) => {
            return (
              <React.Fragment>
                <br />
                <h1>Team name: <strong>{this.state.teamNames[i]}</strong></h1>
                <br />
                  <ul>
                    {team.map((person) => {
                      return <li>{person}</li>
                    })}
                  </ul>
                <br />
              </ React.Fragment>
            )
          })}
        </React.Fragment>  
    )
  }
}


export default Teams