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
        return (
            <React.Fragment>
              <h1 className='title is-1'><Link to='/teams'><button className="btn btn--stripe btn--radius centered btn--large">&larr;---------------</button></Link></h1>
                <div>
                  <h4 className="title is-2 has-text-centered">How many times have these pairs happened really?</h4>
                    <div className="columns">
                      <ul className="column is-6">
                        <h3 className="title is-3">List of {this.props.auth.user.username}'s people</h3>
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

  const mapStateToProps = ({ auth, users }) => ({ auth, users })
  export default connect(mapStateToProps)(Relationships)
