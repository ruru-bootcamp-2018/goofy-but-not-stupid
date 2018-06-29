import React from 'react'

class User extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
    }
  }


  render () {
    return (
        <React.Fragment>
            <h2>{this.props.user.name}</h2>
            <img src={this.props.user.profile_pic} />
            <p>Key Phrase: {this.props.user.phrases}</p>
        </React.Fragment>  
    )
  }
}


export default User