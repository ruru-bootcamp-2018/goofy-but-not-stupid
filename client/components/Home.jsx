import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getUsers } from '../actions/users'
import {getGroups} from '../actions/groups'

import User from './User'
import Description from './Description'
import Footer from './Footer'


class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }

        this.userClick = this.userClick.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(getUsers(this.props.auth.user.id))
        this.props.dispatch(getGroups(this.props.auth.user.id))
    }

    userClick(user) {
        this.setState({
            activeUser: user
        })
    }


    render() {
        const users = this.props.users.users
        return (
            <React.Fragment>
                <div className='row first'>
                    <div className='twelve columns'>
                        <Link to='/teams'><button className="btn btn--stripe btn--radius centered"><h1>GENERATE TEAMS</h1></button></Link>
                    </div>
                </div>

                <hr />

                <div className='row'>
                    <div className='three columns'>
                        <ul>
                            {users.map((user) => {
                                return <li key={user.id} onClick={() => this.userClick(user)}><a href="#">{user.name}</a></li>
                            })}
                        </ul>
                    </div>

                    {
                        !this.state.activeUser &&
                        <div className='nine columns'>
                            <img className='centered gif' src='https://media.giphy.com/media/3eP9HDIMwJVvGTdmNA/giphy.gif' />
                        </div>
                    }

                    {
                        this.state.activeUser &&
                        <User user={this.state.activeUser} />
                    }

                </div>
                <hr />
                <Description />
                <Footer />
            </React.Fragment>
        )
    }
}

const mapStateToProps = ({ auth, users }) => { auth, users }
export default connect(mapStateToProps)(Home)