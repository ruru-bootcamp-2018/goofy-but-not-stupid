import React from 'react'
import { connect } from 'react-redux'

const Profile = (props) => (
    <div className='row'>
        
    </div>
)

const mapStateToProps = ({auth, users, groups}) => {auth, users, groups}
export default connect(mapStateToProps)(Profile)