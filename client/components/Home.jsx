import React from 'react'
import {Link} from 'react-router-dom'
import {getUsers, getUserData} from '../apiClient'
import User from './User'


class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          users: [],
        }
    
        this.userClick = this.userClick.bind(this);
    }
    
    componentDidMount() {
        getUsers()
            .then((res) => {
            // console.log(res)
                this.setState({
                    users: res.users
                })
            })      
    }

    userClick(name) {
        console.log(`clicked ${name}`)
        // console.log(this.state.users)
        getUserData(name)
            .then((finalData) => {
            this.setState({
                activeUser: finalData
            })
            // console.log({finalData})
            })
    }


    render () {
        return (
            <React.Fragment>
                <div className='row'>
                    <div className='twelve columns'>
                        <Link to='/teams'><button className="btn btn--stripe btn--radius centered"><h1>DON'T H8, GENER8</h1></button></Link>
                    </div>
                </div>

                <hr />

                <div className='row'>
                    <div className='three columns'>
                        <ul>
                            {this.state.users.map((user) => {
                                return <li onClick={() => this.userClick(user.name)}><a href="#">{user.name}</a></li>
                            })}
                        </ul>
                    </div>

                    {
                        !this.state.activeUser &&
                            <div className='nine columns'>
                            <img className='centered gif' src='https://media.giphy.com/media/3eP9HDIMwJVvGTdmNA/giphy.gif' />
                            </div>
                    }
                    
                    {
                        this.state.activeUser && 
                            <User user={this.state.activeUser}/>
                    }
                </div>
            </React.Fragment>  
        )
    }
}


export default Home




