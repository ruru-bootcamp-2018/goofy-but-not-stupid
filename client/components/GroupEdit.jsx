import React from 'react'
import { connect } from 'react-redux'

class GroupEdit extends React.Component {
	constructor(props) {
		super(props)
		this.state = {

		}
	}

	render() {
		return (
			<React.Fragment>
				{
					this.props.users.users.length < 1
						? <React.Fragment>
								<div className='column is-3'>
									<p>You need to <Link onClick={this.props.goToPeopleTab()}>add some people!</Link></p>
								</div>
								<div className='column is-9'>
									<img src="todo" alt="toby morris's deal with it thingy"/>
								</div>
							</React.Fragment>
						: <React.Fragment>
								<div className='column is-3'>
									{/* whole thing */}
								</div>
							</React.Fragment>
				}

			</React.Fragment>
		)
	}
}

const mapStateToProps = ({ auth, users, groups }) => { auth, users, groups }
export default connect(mapStateToProps)(GroupEdit)