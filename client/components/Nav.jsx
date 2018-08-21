import React from 'react'
import { Redirect, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logoutUser } from '../actions/logout'

const Nav = (props) => {
    return (
        <div className='columns first'>
            <div className='column is-12'>
                {props.auth.isAuthenticated
                    ? document.location == '/#/profile'
                        ? <p className='has-text-centered'>Hi {props.auth.user.username} -
                        <Link to='/'>home</Link>, <Link to="/login" onClick={() => props.dispatch(logoutUser())}>logout</Link>
                        </p>
                        : <p className='has-text-centered'>Hi {props.auth.user.username} -
                        <Link to='/profile'>edit profile</Link>, <Link to="/login" onClick={() => props.dispatch(logoutUser())}>logout</Link>
                        </p>
                    : <Redirect to='/login' />
                }
            </div>
        </div>
    )
}

const mapStateToProps = ({auth}) => ({auth})
export default connect(mapStateToProps)(Nav)