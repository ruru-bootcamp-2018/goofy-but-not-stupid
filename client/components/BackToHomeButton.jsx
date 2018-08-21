import React from 'react'
import {Link} from 'react-router-dom'

const BackToHomeButton = (props) => (
    <React.Fragment>
        <div className='columns'>
            <div className='column is-12'>
                <h1 className='title is-1'><Link to='/'><button className="btn btn--stripe btn--radius centered btn--large">&larr;---------------</button></Link></h1>
            </div>
        </div>
        <hr />
    </React.Fragment>
)

export default BackToHomeButton