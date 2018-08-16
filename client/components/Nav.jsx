import React from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import {logoutUser} from '../actions/logout'

///

const Nav = (props) => (
    <div className='row'>
        <div className='twelve columns'>
            {props.auth.isAuthenticated 
                ? <p className='centered'>Hi {props.auth.user.username} - <Link onClick={props.dispatch(logoutUser())}>Logout</Link></p>
                : <Redirect to='/login'/>
            }
        </div>
    </div>
)

const mapStateToProps = ({auth}) => {auth}
export default connect(mapStateToProps)(Nav)