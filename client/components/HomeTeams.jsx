import React from 'react'
import { Link } from 'react-router-dom'
import { getUsers, getTeams, getRandomName } from '../apiClient'
import Teams from './Teams'


class HomeTeams extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            users: [],
            submitted: false,
            teamAmount: 3,
            preprocessedTeams: []

        }

        this.handleTeamAmountChange = this.handleTeamAmountChange.bind(this)
        this.handleTeamNumberChange = this.handleTeamNumberChange.bind(this)
    }

    componentDidMount() {
        getUsers()
            .then((res) => {
                this.setState({
                    users: res.users
                })
            }) // cut here - below happens on form submit
        // .then(() => {
        //     getTeams()
        //         .then((newTeams) => {
        //             let namedTeams = newTeams.map((team) => {
        //                 return team.team.map((person) => {
        //                     return person.name
        //                 })
        //             })
        //             this.setState({
        //                 teams: namedTeams,
        //                 teamNumber: namedTeams.length
        //             })
        //         })
        // })
    }

    handleSubmit(e) {
        e.preventDefault()
    }

    handleTeamAmountChange(e) {
        e.preventDefault()
        this.setState({ [e.target.name]: Number(e.target.value) }, setTeams())

        const setTeams = () => {
            let rounding = this.state.users.length % this.state.teamAmount
            
            let arr = []
            for (let i = 0; i < this.state.teamAmount; i++) {
                let max = Math.floor(this.state.users.length/this.state.teamAmount)
                if (rounding > 0) {
                    max++
                    rounding--
                }
                arr.push({
                    max
                })
            }
            this.setState({
                preprocessedTeams: arr
            })
        }
    }

    handleTeamNumberChange(e) {
        let newTeams = preprocessedTeams.map(i => Object.assign({}, i))
        newTeams[e.target.name].max = e.target.value
        this.setState({
            preprocessedTeams: newTeams
        })
        // untested to here
    }




    render() {
        // form hack for now
        if (!this.state.submitted) {
            return (
                <React.Fragment>
                    <form onSubmit={this.handleSubmit}>
                        <label>How many teams?
                            <input type="number" name='teamAmount' onChange={this.handleTeamAmountChange} value={this.state.teamAmount} />
                        </label>
                        <p>Plz make team amounts add up to the total cohort number </p>

                        {this.state.preprocessedTeams.map((team, i) => {
                            return <div>
                                <label>How many people in team {i+1}?
                                    <input type="number" name={i} onChange={this.handleTeamNumberChange}
                                        value={this.state.preprocessedTeams[i].max} />
                                </label>
                            </div>
                        })}
                    </form>
                </React.Fragment>
            )
        }

        else return (
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
