import React from 'react'

class Teams extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }


  render () {
    return (
        <React.Fragment>
          {this.props.teams.map((team) => {
            return (
              <React.Fragment>
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