import React from 'react'
import { connect } from 'react-redux'
import { loginUser } from '../actions/login'
import { Link } from 'react-router-dom'

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: ''
        }
        this.updateDetails = this.updateDetails.bind(this)
        this.submit = this.submit.bind(this)
    }

    updateDetails(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    submit(e) {
        e.preventDefault()
        let { username, password } = this.state
        this.props.dispatch(loginUser({ username, password }))
    }

    render() {
        const { auth } = this.props

        return (
            <div className='row'>
                <div className='four columns offset-by-four'>
                    <div className='row'>
                        <div className='twelve columns'>
                            <form className='form' onSubmit={this.submit}>
                                <h1 className="centered">Login</h1>
                                {auth.errorMessage
                                    && <p className="centered">{auth.errorMessage}</p>}
                                <hr />

                                <label>Username
                                    <input required className="" placeholder="Username" type="text" name="username" onChange={this.updateDetails} />
                                </label>

                                <label>Password
                                    <input required className="" placeholder="Password" type="password" name="password" onChange={this.updateDetails} />
                                </label>
                                <p className='centered'>Don't have an account? <Link to='/register'>Create an account here</Link></p>

                                <hr />
                                <input className="" value='Login' type="submit" />
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

export default connect(mapStateToProps)(Login)
