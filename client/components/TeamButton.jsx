import React from 'react'

class TeamButton extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }


  render () {
    return (
        <React.Fragment>
            <div className='row'>
                <div className='twelve columns'>
                    <button className="btn btn--stripe btn--radius centered" onClick={this.generateTeam}><h1>DON'T H8, GENER8</h1></button>
                </div>
            </div>
        </React.Fragment>  
    )
  }
}


export default TeamButton


