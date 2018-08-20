import React from 'react'
import { connect } from 'react-redux'
import { registerUserRequest } from '../actions/register'
import { loginError } from '../actions/login'
import { Link } from 'react-router-dom'

class Register extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			username: '',
			email_address: '',
			password: '',
			confirm_password: ''
		}
		this.updateDetails = this.updateDetails.bind(this)
		this.submit = this.submit.bind(this)
	}

	updateDetails(e) {
		this.setState({ [e.target.name]: e.target.value })
	}

	submit(e) {
		e.preventDefault()
		e.target.reset() // look this up
		let { password, confirm_password } = this.state
		if (confirm_password != password) return this.props.dispatch(loginError("Passwords don't match"))
		this.props.dispatch(registerUserRequest(this.state))
	}

	render() {
		const { auth } = this.props

		return (
			<div className='columns centered'>
				<div className='column is-4'>
					<form className='form' onSubmit={this.submit}>
						<h1 className=" title is-1 has-text-centered">Register</h1>
						{auth.errorMessage
							&& <p className="has-text-centered">{auth.errorMessage}</p>}
						<hr />

						<label className='label'>Username
            	<input required className="input" placeholder="Username" type="text" name="username" onChange={this.updateDetails} />
						</label>

						<label className='label'>Email Address
              <input required className="input" placeholder="Email Address" type="email" name="email_address" onChange={this.updateDetails} />
						</label>

						<label className='label'>Password
              <input required className="input" placeholder="Password" type="password" name="password" onChange={this.updateDetails} />
						</label>

						<label className='label'>Confirm Password
              <input required className="input" placeholder="One more time..." type="password" name="confirm_password" onChange={this.updateDetails} />
						</label>
						<p className='has-text-centered'>Already have an account? <Link to='/login'>Login here</Link></p>

						<hr />
						<input className="input" value='Register' type="submit" />
					</form>

				</div>
			</div>
		)
	}
}

const mapStateToProps = ({ auth }) => ({auth})
export default connect(mapStateToProps)(Register)
