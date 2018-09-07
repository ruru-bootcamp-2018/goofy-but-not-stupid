import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getTeams } from '../apiClient'
import { getUsers } from '../actions/users'
import { getGroups, addGroup } from '../actions/groups'

import Footer from './Footer'

class PreviousTeams extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            groups: [],
            currentGroup: {
              people: []
            }
        }
      this.findGroup = this.findGroup.bind(this)
    }

    componentDidMount() {
      this.setState({
        groups: this.props.dispatch(getGroups(this.props.auth.user.id))
      })
    }

    findGroup(name) {
      let current = this.props.groups.groups.filter(groups => name == groups.name)
      this.setState({
        currentGroup: current[0]
      })
    }

    render() {
      const groups = this.props.groups.groups
        return (
            <React.Fragment>
              <h1 className='title is-1'><Link to='/teams'><button className="btn btn--stripe btn--radius centered btn--large">&larr;---------------</button></Link></h1>
                <div>
                  <h4 className="title is-2 has-text-centered">Click team name to see members</h4>
                  <ul>
                  {groups.map(group => <li key={group.name}><a onClick={() => this.findGroup(group.name)}><h4>{group.name}</h4></a></li>)}
                  </ul>
                </div>

                <div className="columns is-multiline">
                  {this.state.currentGroup && this.state.currentGroup.people.map(person => {
                      return (
                        <div key={person.name} className="column is-4">
                          <h3>{person.name}</h3>
                          <img className="profilePic" src={person.profile_pic} />
                        </div>
                      )
                  })}
                </div>
              <Footer />
            </React.Fragment>
        )
    }
  }

  const mapStateToProps = ({ auth, users, groups }) => ({ auth, users, groups })
  export default connect(mapStateToProps)(PreviousTeams)
