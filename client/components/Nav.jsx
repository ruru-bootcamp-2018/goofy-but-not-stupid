import React from 'react'
import { Redirect, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logoutUser } from '../actions/logout'
import {navigateTo} from '../actions/nav'

const Nav = (props) => {
    console.log(document.location.hash)
    return (
        <div className='columns first'>
            <div className='column is-12'>
                {props.auth.isAuthenticated
                    ? props.nav === '#/profile'
                    ? <p className='has-text-centered'>Hi {props.auth.user.username} -
                        <Link to='/' onClick={() => props.dispatch(navigateTo('#/'))}> home</Link> | <Link to="/login" onClick={() => props.dispatch(logoutUser())}>logout</Link>
                        </p>
                        : <p className='has-text-centered'>Hi {props.auth.user.username} -
                        <Link to='/profile' onClick={() => props.dispatch(navigateTo('#/profile'))}> edit profile</Link> | <Link to="/login" onClick={() => props.dispatch(logoutUser())}>logout</Link>
                        </p>
                    : <Redirect to='/login' />
                }
            </div>
        </div>
    )
}

const mapStateToProps = ({auth, nav}) => ({auth, nav})
export default connect(mapStateToProps)(Nav)