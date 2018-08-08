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
            <div className='row'>
                <div className='four columns offset-by-four'>
                    <div className='row'>
                        <div className='twelve columns'>
                            <form className='form' onSubmit={this.submit}>
                                <h1 className="centered">Register</h1>
                                {auth.errorMessage
                                    && <p className="centered">{auth.errorMessage}</p>}
                                <hr />

                                <label>Username
                                    <input required className="" placeholder="Username" type="text" name="username" onChange={this.updateDetails} />
                                </label>

                                <label>Email Address
                                    <input required className="" placeholder="Email Address" type="email" name="email_address" onChange={this.updateDetails} />
                                </label>

                                <label>Password
                                    <input required className="" placeholder="Password" type="password" name="password" onChange={this.updateDetails} />
                                </label>

                                <label>Confirm Password
                                    <input required className="" placeholder="One more time..." type="password" name="confirm_password" onChange={this.updateDetails} />
                                </label>
                                <p className='centered'>Already have an account? <Link to='/login'>Login here</Link></p>

                                <hr />
                                <input className="" value='Register' type="submit" />
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

const mapStateToProps = ({ auth }) => {
    return {
        auth
    }
}

export default connect(mapStateToProps)(Register)
