import React from 'react'

const Description = (props) => (
    <React.Fragment>
        <div className='columns first'>
            <div className='column is-12'>
                <h1 className='title is-1'>Team builder v3</h1>
                <p>Makes better teams for group projects where people are paired up with the least people they have worked with before in past projects.</p>
                <p>App is now account-based with full account building functionality. You're able to costomise a list of all team-members, input past project pairing history and dynamically generate the best possible team structure for them. 🚀🚀🚀.</p>
                <li>Select team members from left hand list for more info.</li>
                <li>When you're ready to generate teams, hit the button, select the amount of teams and the number split and go!</li>
                <br/><br/>
                <p><strong>If you're setting up your account from scratch:</strong></p>
                <li>Select 'edit profile' from the top nav.</li>
                <li>Add all your people in the people tab top left.</li>
                <li>Once you've got some people, add any past group history in the group tab that you want the app to take into account when generating shiny new groups.</li>
                <li>Make some groups!</li>
            </div>
        </div>
    </React.Fragment>
)

export default Description