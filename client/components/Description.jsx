import React from 'react'

const Description = (props) => (
    <React.Fragment>
        <div className='columns first'>
            <div className='column is-6'>
                <h3 className='title is-3'>Team builder</h3>
                <p>Makes better teams for EDA group projects where everyone is paired with the least people they have worked with before in past projects.</p>
                <p>Currently only set up for our mid-2018 EDA cohort tracking our group pairing history.</p>
                <ul>
                    <li>Select cohort members from left hand list for more info.</li>
                    <li>When you're ready to generate teams, hit the button, select how amount of teams and number split and go!</li>
                </ul>
            </div>
            <div className='column is-6'>
                <h3 className='title is-3'>Up next...</h3>
                <p>By late August, this site will be account-based. After you login, you'll have the ability to create a new list of team-members, input past project pairing history and dynamically generate the best possible team structure for them. 🚀🚀🚀</p>
            </div>
        </div>
    </React.Fragment>
)

export default Description