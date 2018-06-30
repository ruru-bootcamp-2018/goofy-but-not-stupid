import React from 'react'
import {getPoki} from '../apiClient'

class User extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }

  componentDidUpdate() {
    getPoki()
      .then((poki) => {
        console.log('back to user comp: ',poki)
        this.setState({
          poki: poki
        })
      })
  }


  render () {
    return (
        <React.Fragment>
          <div className='six columns'>
            <img className='user-img' src={this.props.user.profile_pic} />
          </div>

          <div className="three columns user">

            <h5>{this.props.user.name}</h5>
            <p className="caps item"><b>Ability: </b>
              {
                this.state.poki && 
                  this.state.poki.fullInfo.abilities[0].ability.name
              }
            </p>

            <p className="item"><b>Agility:  </b>
              {this.props.user.agility}
            </p>
              
            <p className="item"><b>Key Phrase: </b>{this.props.user.phrases}</p>
          </div>
        </React.Fragment>  
    )
  }
}


export default User