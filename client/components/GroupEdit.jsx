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

	updateDetails() {
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
				{
					this.props.users.users.length < 1
						? <React.Fragment>
							<div className='column is-3'>
								<p>You need to <Link onClick={this.props.goToPeopleTab()}>add some people!</Link></p>
							</div>
							<div className='column is-9'>
								<img src="todo" alt="toby morris's deal with it thingy" />
							</div>
						</React.Fragment>

						: <React.Fragment>
							<div className='column is-3'>
								<form className='form'>
									<h1 className="title is-1 has-text-centered">Add  Group</h1>
									{auth.errorMessage
										&& <p className="has-text-centered">{this.props.groups.errorMessage}</p>}
									<hr />

									<p>Click users from the list to add them to this group.</p>
									<label className='label'>Group name
              			<input required className="input" placeholder="e.g. the swiss potatoes" type="text" name="name" onChange={this.updateDetails} />
									</label>

									<label className='label'>People
              			<ul>
											{this.state.people.map(p => {
												return <li key={user.id}><Link onClick={() => this.remove(user)}>{p.name}</Link></li>
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