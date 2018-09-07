import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getUsers } from '../actions/users'
import { getRelationships } from '../actions/relationships'

import Footer from './Footer'

class Relationships extends React.Component {
    constructor(props) {
      super(props)
        this.state = {
            users: [],
            relationships: []
        }
    }

    componentDidMount() {
      this.setState({
        users: this.props.dispatch(getUsers(this.props.auth.user.id)),
        relationships: this.props.dispatch(getRelationships(this.props.auth.user.id))
      })
    }

    render() {
      const users = this.props.users.users
      let username = this.props.auth.user.username
      username = username.charAt(0).toUpperCase() + username.substring(1, username.length)
        return (
            <React.Fragment>
              <h1 className='title is-1'><Link to='/teams'><button className="btn btn--stripe btn--radius centered btn--large">&larr;---------------</button></Link></h1>
                <div>
                  <h4 className="title is-2 has-text-centered">How many times have these pairs happened really?</h4>
                    <div className="columns">
                      <ul className="column is-6">
                        <h3 className="title is-3">List of {username}s people</h3>
                        {users.map(user => {
                          return (
                            <div key={user.name}>
                              <li><h4>{user.name}</h4></li>
                              <hr />
                            </div>
                          )
                        })}

                      </ul>
                      <ul className="column is-6">
                        <h3 className="title is-3">The official count</h3>
                        <p>where relationship map goes</p>
                        <hr />
                      </ul>
                    </div>
                </div>

              <Footer />
            </React.Fragment>
        )
    }
  }

  const mapStateToProps = ({ auth, users, relationships }) => ({ auth, users, relationships })
  export default connect(mapStateToProps)(Relationships)
