import React from 'react'
import { connect } from 'react-redux'

const Profile = (props) => (
    <React.Fragment>
        <div className='row'>
            
        </div>
    </React.Fragment>
)

const mapStateToProps = ({auth, users, groups}) => {auth, users, groups}
export default connect(mapStateToProps)(Profile)