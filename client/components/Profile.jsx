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
		// TODO: double check innerHTML of parent element works + toLowerCase method
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
							? <GroupEdit goToPeopleTab={this.goToPeopleTab}/>
							: <PeopleEdit/>
					}

				</div>
			</React.Fragment>
		)
	}
}

const mapStateToProps = ({ auth, users, groups }) => { auth, users, groups }
export default connect(mapStateToProps)(Profile)