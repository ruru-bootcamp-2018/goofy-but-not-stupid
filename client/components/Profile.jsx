import React from 'react'
import { connect } from 'react-redux'
import { getUsers } from '../actions/users'
import { getGroups } from '../actions/groups'
import GroupEdit from './GroupEdit'
import PeopleEdit from './PeopleEdit'
import Footer from './Footer'

class Profile extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			tab: 'groups'
		}
		this.switchTabs = this.switchTabs.bind(this)
		this.goToPeopleTab = this.goToPeopleTab.bind(this)
	}

	componentDidMount() {
		if (this.props.auth.isAuthenticated) {
			if (!this.props.users.fetched) {
				this.props.dispatch(getGroups(this.props.auth.user.id))
				this.props.dispatch(getUsers(this.props.auth.user.id))
			}
		}
	}

	switchTabs(e) {
		this.setState({
			tab: e.target.innerHTML.toLowerCase()
		})
	}

	goToPeopleTab() {
		this.setState({
			tab: 'people'
		})
	}

	render() {
		return (
			<React.Fragment>
				<div className='columns is-multiline'>
					<div className='column is-12'>
						<div className="tabs is-boxed is-left">
							<ul>
								<li className={`${this.state.tab == 'groups' && 'is-active'}`} onClick={this.switchTabs}>
									<a>GROUPS</a>
								</li>
								<li className={`${this.state.tab == 'people' && 'is-active'}`} onClick={this.switchTabs}>
									<a>PEOPLE</a>
								</li>
							</ul>
						</div>
					</div>

					{
						this.state.tab == 'groups'
							? <GroupEdit goToPeopleTab={this.goToPeopleTab} />
							: <PeopleEdit />
					}

				</div>
				<Footer />
			</React.Fragment>
		)
	}
}

const mapStateToProps = ({ auth, users, groups }) => ({ auth, users, groups })
export default connect(mapStateToProps)(Profile)