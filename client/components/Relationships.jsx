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
            relationships: [],
            currentCounts: []
        }
      this.findCount = this.findCount.bind(this)
    }

    componentDidMount() {
      this.setState({
        users: this.props.dispatch(getUsers(this.props.auth.user.id)),
        relationships: this.props.dispatch(getRelationships(this.props.auth.user.id))
      })
    }

    componentWillReceiveProps(nextProps) {
      this.setState({
        users: nextProps.users.users,
        relationships: nextProps.relationships.relationships
      })
    }

    findCount(user_id) {
      let filtered = this.state.relationships.filter(relationship => (relationship.id_one == user_id || relationship.id_two == user_id))
      console.log(filtered)
    }

    render() {
      const users = this.props.users.users
      let username = this.props.auth.user.username
      username = username.charAt(0).toUpperCase() + username.substring(1, username.length)
      console.log(this.state.relationships)
        return (
            <React.Fragment>
              <h1 className='title is-1'><Link to='/teams'><button className="btn btn--stripe btn--radius centered btn--large">&larr;---------------</button></Link></h1>
                <div>
                  <h4 className="title is-3 has-text-centered">How many times have these pairs happened really? Click a name to find out</h4>
                    <div>
                      <h3 className="title is-4">List of {username}s people</h3>
                        <ul className="columns is-multiline">
                        {users.map(user => {
                          return (
                            <div className="column is-2" key={user.name}>
                              <li><a onClick={() => this.findCount(user.id)}><h4>{user.name}</h4></a></li>
                              <hr />
                            </div>
                          )
                        })}

                      </ul>
                      <ul className="column is-6">
                        <h3 className="title is-4">The official count</h3>
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
