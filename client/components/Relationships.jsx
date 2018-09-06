import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getUsers } from '../actions/users'

import Footer from './Footer'

class Relationships extends React.Component {
    constructor(props) {
      super(props)
        this.state = {
            users: []
        }
    }

    componentDidMount() {
      this.setState({
        users: this.props.dispatch(getUsers(this.props.auth.user.id))
      })
    }

    render() {
      const users = this.props.users.users
      console.log(users, this.props.users);
        return (
            <React.Fragment>
              <h1 className='title is-1'><Link to='/teams'><button className="btn btn--stripe btn--radius centered btn--large">&larr;---------------</button></Link></h1>
                <div>
                  <h4 className="title is-2 has-text-centered">Peeps you've worked with before</h4>
                  <ul>
                  {this.state.users && users.map(user => <li key={user.name}><h4>{user.name}</h4></li>)}
                  </ul>
                </div>

              <Footer />
            </React.Fragment>
        )
    }
  }

  const mapStateToProps = ({ auth, users }) => ({ auth, users })
  export default connect(mapStateToProps)(Relationships)
