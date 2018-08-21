import React from 'react'
import { getPoki } from '../apiClient'

class User extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      ability: ''
    }
    this.getSpecialAbility = this.getSpecialAbility.bind(this)
  }

  componentDidMount() {
    this.getSpecialAbility()
  }

  componentDidUpdate(prevProps) {
    if (this.props.user.id != prevProps.user.id) {
      this.setState({ ability: '' },
        this.getSpecialAbility
      )
    }
  }


  getSpecialAbility() {
    getPoki()
      .then((poki) => {
        this.setState({
          ability: poki.fullInfo.abilities[0].ability.name
        })
      })
  }


  render() {
    return (
      <React.Fragment>
        <div className='column is-6'>
          <img className='user-img' src={this.props.user.profile_pic} />
        </div>

        <div className="column is-3 user">
          <h2 className='title is-2'>{this.props.user.name}</h2>

          <p className="item"><b>Agility: </b>
            {this.props.user.agility}
          </p>
          <p className="caps item"><b>Special ability: </b>
            {this.state.ability}
          </p>

          <p className="item"><b>Key Phrase: </b>{this.props.user.phrase}</p>
        </div>
      </React.Fragment>
    )
  }
}


export default User