import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { getTeams } from '../apiClient'
import { getUsers } from '../actions/users'
import { getGroups, addGroup } from '../actions/groups'

import BackToHomeButton from './BackToHomeButton'
import Footer from './Footer'

class PreviousTeams extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            groups: []
        }
      this.findGroup = this.findGroup.bind(this)
    }

    componentDidMount() {
      this.setState({
        groups: this.props.dispatch(getGroups(this.props.auth.user.id))
      })
    }

    findGroup(name) {

    }

    render() {
      const groups = this.props.groups.groups
        return (
            <React.Fragment>
              <BackToHomeButton />
                <div className="columns is-multiline">
                  <ul>
                  {groups.map(group => <li key={group.name}><a><h4>{group.name}</h4></a></li>)}
                  </ul>
                </div>
              <Footer />
            </React.Fragment>
        )
    }
  }

  const mapStateToProps = ({ auth, users, groups }) => ({ auth, users, groups })
  export default connect(mapStateToProps)(PreviousTeams)
