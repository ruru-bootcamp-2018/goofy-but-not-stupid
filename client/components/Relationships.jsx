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
            currentCounts: [],
            clickedUser: {},
            filtered: false
        }
      this.findCount = this.findCount.bind(this)
    }

    componentDidMount() {
        this.props.dispatch(getUsers(this.props.auth.user.id)),
        this.props.dispatch(getRelationships(this.props.auth.user.id))
    }

    componentWillReceiveProps(nextProps) {
      this.setState({
        users: nextProps.users.users,
        relationships: nextProps.relationships.relationships,
      })
    }

    findCount(user_id) {
      this.setState({
        currentCounts: this.state.relationships.filter(relationship => (relationship.id_one == user_id || relationship.id_two == user_id)),
        clickedUser: this.state.users.find(user => user.id == user_id),
        filtered: true
      })
    }

    render() {
      const users = this.props.users.users
      let username = this.props.auth.user.username
      username = username.charAt(0).toUpperCase() + username.substring(1, username.length)
      let titleString = this.state.filtered ? `${this.state.clickedUser.name}'s matches` : `List of ${username}'s people`
      let show = this.state.filtered ? 'title is-4' : 'is-hidden title is-4'

        return (
            <React.Fragment>
              <h1 className='title is-1'><Link to='/teams'><button className="btn btn--stripe btn--radius centered btn--large">&larr;---------------</button></Link></h1>
                <div>
                  <h4 className="title is-3 has-text-centered">How many times have these pairs happened really? <br /> Click a name to find out</h4>
                    <div>
                      <h3 className="title is-4">{titleString}</h3>
                        <ul className="columns is-multiline">
                        {users.map(user => {
                          return (
                            <div className="column is-2" key={user.name}>
                              <li><a onClick={() => this.findCount(user.id)}><h4>{user.name}</h4></a></li>
                              <li>Id no: {user.id}</li>
                              <hr />
                            </div>
                          )
                        })}

                      </ul>

                        <h3 className={show}>The official counts</h3>
                          <ul className="columns is-multiline">
                           {this.state.currentCounts && this.state.currentCounts.map(match => {
                            let notCurrentUser = (match.id_one == this.state.clickedUser.id) ? match.id_two : match.id_one
                            let pair = match.count > 1 ? 'pairings' : match.count == 0 ? 'pairings' : 'pair'
                              return (
                                <div className="column is-2" key={match.id}>
                                  <li>{match.count} {pair} with group member {notCurrentUser}</li>
                                </div>
                              )
                            })}
                          </ul>
                        <hr />
                    </div>
                </div>

              <Footer />
            </React.Fragment>
        )
    }
  }

  const mapStateToProps = ({ auth, users, relationships }) => ({ auth, users, relationships })
  export default connect(mapStateToProps)(Relationships)
