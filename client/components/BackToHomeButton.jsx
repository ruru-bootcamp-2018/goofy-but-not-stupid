import React from 'react'
import {Link} from 'react-router-dom'

const BackToHomeButton = (props) => (
    <React.Fragment>
        <div className='row first'>
            <div className='twelve columns'>
                <Link to='/'><button className="btn btn--stripe btn--radius centered"><h1>&larr;-------------</h1></button></Link>
            </div>
        </div>
        <hr />
    </React.Fragment>
)

export default BackToHomeButton