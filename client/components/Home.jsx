import React from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { getUsers } from '../actions/users'
import { getGroups } from '../actions/groups'

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
		if (this.props.auth.isAuthenticated) {
			this.props.dispatch(getUsers(this.props.auth.user.id))
			this.props.dispatch(getGroups(this.props.auth.user.id))
		}
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
				<div className='columns'>
					<div className='column is-12'>
						<h1 className='title is-1'><Link to='/teams'><button className="btn btn--stripe btn--radius centered btn--large">GENERATE TEAMS</button></Link></h1>
					</div>
				</div>

				<hr />

				<div className='columns'>
					<div className='column is-3'>
						<h3 className='title is-3'>People</h3>
						{users.length > 0 
							?
								users.map((user) => {
									return <li key={user.id} onClick={() => this.userClick(user)}><a href="#">{user.name}</a></li>
								})
							:
								<p>You need to <Link to='/profile'>add some people!!</Link></p>
						}
					</div>

					{
						!this.state.activeUser &&
						<div className='column is-9'>
							<img className='is-centered gif' src='https://media.giphy.com/media/3eP9HDIMwJVvGTdmNA/giphy.gif' />
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

const mapStateToProps = ({ auth, users }) => ({ auth, users })
export default connect(mapStateToProps)(Home)