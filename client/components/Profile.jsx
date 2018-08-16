import React from 'react'
import { connect } from 'react-redux'
import GroupEdit from './GroupEdit'
import PeopleEdit from './PeopleEdit'

class Profile extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			tab: 'groups'
		}
		this.switchTabs = this.switchTabs.bind(this)
		this.goToPeopleTab = this.goToPeopleTab.bind(this)
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
				<div className='row'>
					<div className='twelve columns'>
						<button className='btn btn--stripe btn--radius centered' onClick={this.switchTabs}>GROUPS</button>
						<button className='btn btn--stripe btn--radius centered' onClick={this.switchTabs}>PEOPLE</button>
						<hr/>

						{
							this.state.tab == 'groups'
								? <GroupEdit goToPeopleTab={this.goToPeopleTab}/>
								: <PeopleEdit/>
						}

					</div>
				</div>
			</React.Fragment>
		)
	}
}

const mapStateToProps = ({ auth, users, groups }) => { auth, users, groups }
export default connect(mapStateToProps)(Profile)