import React from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'

class GroupEdit extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			name: '',
			people: [],
			users: []
		}

		this.updateDetails = this.updateDetails.bind(this)
		this.remove = this.remove.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	componentDidMount() {
		this.setState({ users: this.props.users.users })
	}

	updateDetails(e) {
		this.setState({ [e.target.name]: e.target.value })
	}

	remove(user) {
		this.setState({
			people: this.state.people.filter(p => p.id != user.id)
		})
	}

	handleSubmit(e) {
		e.preventDefault()
		// submitty stuff
	}

	render() {
		return (
			<React.Fragment>
				<div className='column is-12'>
                    <h1 className='space-below title is-1 has-text-centered'>Set up your groups</h1>
                </div>
				
				{this.props.users.users.length < 1
					? <React.Fragment>
						<div className='column is-12'>
							<p className='has-text-centered'>You need to <Link to='/profile' onClick={() => this.props.goToPeopleTab()}>add some people!!</Link></p>
						</div>
						<div className='column is-12'>
							<img src="http://internationalrescue.com/wp-content/uploads/2014/05/21-international-rescue-illustrator-toby-morris.gif" alt="toby morris's deal with it thingy" />
							<p>Credit - Toby Morris</p>
						</div>
					</React.Fragment>

					: <React.Fragment>
						<div className='column is-6'>
							<form className='form'>
								<h3 className="title is-3">Add group</h3>
								{this.props.auth.errorMessage
									&& <p className="has-text-centered">{this.props.groups.errorMessage}</p>}
								<hr />

								<p>Click users from the list to add them to this group.</p>
								<label className='label'>Group name
									<input required className="input" placeholder="e.g. the swiss potatoes" type="text" name="name" onChange={this.updateDetails} />
								</label>

								<label className='label'>People
									<ul>
										{this.state.people.map(p => {
											return <li key={user.id}><Link to='/profile' onClick={() => this.remove(user)}>{p.name}</Link></li>
										})}
									</ul>
								</label>

								<h4 className='title is-4'>Total: {this.state.people.length}</h4>
								<button className='btn btn--stripe btn--radius is-centered' onClick={this.handleSubmit}>SUBMIT</button>
							</form>
						</div>


					</React.Fragment>
				}

			</React.Fragment>
		)
	}
}

const mapStateToProps = ({ auth, users, groups }) => ({ auth, users, groups })
export default connect(mapStateToProps)(GroupEdit)