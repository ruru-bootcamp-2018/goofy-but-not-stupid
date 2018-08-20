import React from 'react'
import { connect } from 'react-redux'
import { getTeams } from '../apiClient'
import { getUsers } from '../actions/users'

import Teams from './Teams'
import BackToHomeButton from './BackToHomeButton'
import Footer from './Footer'

class HomeTeams extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            submitted: false,
            teamAmount: 3,
            preprocessedTeams: []
        }

        this.handleTeamAmountChange = this.handleTeamAmountChange.bind(this)
        this.handleTeamNumberChange = this.handleTeamNumberChange.bind(this)
        this.setTeams = this.setTeams.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        // TODO: double check - assuming it converts empty array to falsy
        const usersAreFetched = !!this.props.users.users
        if (!usersAreFetched) {
            // TODO: double check async dispatch can .then
            this.props.dispatch(getUsers(this.props.auth.user.id))
                .then(() => {
                    this.setTeams()
                })
        }
    }

    handleTeamAmountChange(e) {
        e.preventDefault()
        let key = e.target.name
        // need string for display purposes in render()
        let newTeamAmountForStringPurposes = e.target.value
        // need integer for calculus
        let newTeamAmountForRoundingPurposes = Number(e.target.value)
        this.setTeams(newTeamAmountForRoundingPurposes)
        this.setState({ [key]: newTeamAmountForStringPurposes })
    }

    setTeams(newTeamAmount) {
        let users = this.props.users.users
        let teamAmount = newTeamAmount || this.state.teamAmount
        let rounding = users.length % teamAmount
        let arr = []
        for (let i = 0; i < teamAmount; i++) {
            let max = Math.floor(users.length / teamAmount)
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
        let users = this.props.users.users

        // preprocessing teams for backend
        this.state.preprocessedTeams.forEach(t => {
            t.max = Number(t.max)
            t.team = []
        })

        let totalMaxes = this.state.preprocessedTeams.reduce((acc, i) => acc + i.max, 0)
        if (totalMaxes != users.length) {
            alert(`Nope! Current total amount of people in teams is ${totalMaxes}. Please make this add up to the total amount of people in the cohort, ${users.length}.`)
            return
        } else {
            getTeams(this.state.preprocessedTeams, this.props.users.users)
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
                    <form className='form' onSubmit={this.handleSubmit}>
                        <div className='columns'>
                            <div className='column is-6'>
                                <h1 className='title is-1'>How many</h1>
                                <p>Enter how many teams you'd like to generate.</p>
                                <input required className='input' type="number" name='teamAmount' onChange={this.handleTeamAmountChange} value={this.state.teamAmount} />
                            </div>
                            <div className='column is-6'>
                                <h1 className='title is-1'>Team size</h1>
                                <p>How many people should be in each team. Make sure this adds up to your total cohort size - {this.props.users.users.length}</p>
                                {this.state.preprocessedTeams.map((team, i) => {
                                    return (
                                        <div key={`input${i + 1}`}>
                                            <label>Team {i + 1}
                                                <input className='input' type="number" name={i} onChange={this.handleTeamNumberChange}
                                                    value={this.state.preprocessedTeams[i].max} />
                                            </label>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                        <hr />
                        <div className='columns'>
                            <div className='column is-12'>
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
                <div className='columns is-multiline'>
                    {
                        this.state.teams &&
                        <Teams teams={this.state.teams} teamNumber={this.state.teamNumber} />
                    }
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = ({ auth, users }) => ({ auth, users })
export default connect(mapStateToProps)(HomeTeams)