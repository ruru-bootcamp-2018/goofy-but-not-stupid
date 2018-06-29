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
            <p>All the other junk</p>
        </React.Fragment>  
    )
  }
}


export default User