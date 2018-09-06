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
            teams: []
        }
    }

    componentDidMount() {

    }

    render() {
        return (
            <React.Fragment>
              <BackToHomeButton />

              <Footer />
            </React.Fragment>
        )
    }
  }

  const mapStateToProps = ({ auth, users }) => ({ auth, users })
  export default connect(mapStateToProps)(PreviousTeams)
