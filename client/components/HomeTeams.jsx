import React from 'react'
import { getUsers, getTeams } from '../apiClient'

import Teams from './Teams'
import BackToHomeButton from './BackToHomeButton'
import Footer from './Footer'

class HomeTeams extends React.Component {
    constructor(props) {
        super(props)

        this.handleTeamAmountChange = this.handleTeamAmountChange.bind(this)
        this.handleTeamNumberChange = this.handleTeamNumberChange.bind(this)
        this.setTeams = this.setTeams.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

        this.state = {
            users: [],
            submitted: false,
            teamAmount: 3,
            preprocessedTeams: []
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
                this.setTeams()
            })
    }


    handleTeamAmountChange(e) {
        e.preventDefault()
        let key = e.target.name
        let newTeamAmountForStringPurposes = e.target.value
        let newTeamAmountForRoundingPurposes = Number(e.target.value)
        this.setTeams(newTeamAmountForRoundingPurposes)
        this.setState({ [key]: newTeamAmountForStringPurposes })
    }

    setTeams(newTeamAmount) {
        let teamAmount = newTeamAmount || this.state.teamAmount
        let rounding = this.state.users.length % teamAmount
        let arr = []
        for (let i = 0; i < teamAmount; i++) {
            let max = Math.floor(this.state.users.length / teamAmount)
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

    handleTeamNumberChange(e) {
        let newTeams = this.state.preprocessedTeams.map(i => Object.assign({}, i))
        newTeams[e.target.name].max = e.target.value
        this.setState({
            preprocessedTeams: newTeams
        })
    }

    handleSubmit(e) {
        e.preventDefault()

        // processing teams for backend
        this.state.preprocessedTeams.forEach(i => {
            i.max = Number(i.max)
            i.team = []
        })

        let totalMaxes = this.state.preprocessedTeams.reduce((acc, i) => acc + i.max, 0)
        if (totalMaxes != this.state.users.length) {
            alert(`Nope! Current total amount of people in teams is ${totalMaxes}. Please make this add up to the total amount of people in the cohort, ${this.state.users.length}.`)
            return
        } else {
            getTeams(this.state.preprocessedTeams)
                .then((newTeams) => {
                    let namedTeams = newTeams.map((team) => {
                        return team.team.map((person) => {
                            return person.name
                        })
                    })
                    this.setState({
                        teams: namedTeams,
                        teamNumber: namedTeams.length,
                        submitted: true
                    })
                })
                .catch(err => {
                    console.log({ err })
                })
        }
    }



    render() {

        //pre submit button
        if (!this.state.submitted) {
            return (
                <React.Fragment>
                    <BackToHomeButton />
                    <form onSubmit={this.handleSubmit}>
                        <div className='row'>
                            <div className='six columns'>
                                <h1>How many.</h1>
                                <p>Enter how many teams you'd like to generate.</p>
                                <input required type="number" name='teamAmount' onChange={this.handleTeamAmountChange} value={this.state.teamAmount} />
                                <br />
                            </div>
                            <div className='six columns'>
                                <h1>Team size.</h1>
                                <p>How many people should be in each team. Make sure this adds up to your total cohort size - {this.state.users.length}</p>
                                {this.state.preprocessedTeams.map((team, i) => {
                                    return <div key={`input${i + 1}`}>
                                        <label>Team {i + 1}
                                            <input type="number" name={i} onChange={this.handleTeamNumberChange}
                                                value={this.state.preprocessedTeams[i].max} />
                                        </label>
                                    </div>
                                })}
                            </div>
                        </div>
                        <hr />
                        <div className='row'>
                            <div className='twelve columns'>
                                <button className='btn btn--stripe btn--radius centered' onClick={this.handleSubmit}>GENERATE TEAMS</button>
                            </div>
                        </div>
                    </form>
                    <Footer />
                </React.Fragment>
            )
        }

        //post submit button
        else return (
            <React.Fragment>
                <BackToHomeButton />
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
