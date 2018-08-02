import React from 'react'
import { Link } from 'react-router-dom'
import { getUsers, getTeams, getRandomName } from '../apiClient'
import Teams from './Teams'


class HomeTeams extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    componentDidMount() {
        getUsers()
            .then((res) => {
                this.setState({
                    users: res.users
                })
            })
            .then(() => {
                getTeams()
                    .then((newTeams) => {
                        let namedTeams = newTeams.map((team) => {
                            return team.team.map((person) => {
                                return person.name
                            })
                        })
                        this.setState({
                            teams: namedTeams,
                            teamNumber: namedTeams.length
                        })
                    })
            })
    }


    render() {
        return (
            <React.Fragment>
                <div className='row first'>
                    <div className='twelve columns'>
                        <Link to='/'><button className="btn btn--stripe btn--radius centered"><h1>&larr;-------------</h1></button></Link>
                    </div>
                </div>

                <hr />

                <div className='row'>
                    {
                        this.state.teams &&
                        <Teams teams={this.state.teams} teamNumber={this.state.teamNumber} />
                    }
                </div>
            </React.Fragment>
        )
    }
}


export default HomeTeams
