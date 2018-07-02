import React from 'react'
import {Link} from 'react-router-dom'
import {getUsers, getTeams, getRandomName} from '../apiClient'
import Teams from './Teams'


class HomeTeams extends React.Component {
  constructor (props) {
    super(props)
    this.state = {

    }
  }

  componentDidMount() {
    getUsers()
        .then((res) => {
            console.log('users: ',res.users)
            this.setState({
                users: res.users
            })
        })
        .then(() => {
            getTeams()
                .then((newTeams) => {
                // console.log(newTeams)
                let namedTeams = newTeams.map((team) => {
                    return team.map((id) => {
                    let targetPerson = this.state.users.find((person) => {
                        return (person.id == id)
                    })
                    return targetPerson.name
                    })
                })
                // console.log(namedTeams)

                this.setState({
                    teams: namedTeams
                })
                console.log(this.state)
                })
        })
  }


  render () {
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
                        <Teams teams={this.state.teams} teamNameOne={this.state.nameOne} teamNameTwo={this.state.nameTwo} teamNameThree={this.state.nameThree} />
                }
            </div>
        </React.Fragment>  
    )
  }
}


export default HomeTeams