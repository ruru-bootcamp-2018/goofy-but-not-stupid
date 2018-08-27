import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { addUser, editUser } from '../actions/users'

const initialState = {
    name: '',
    profile_pic: '',
    agility: 5,
    phrase: '',
    addingUser: true,
    editingUser: false
}

class PeopleEdit extends React.Component {
    constructor(props) {
        super(props)
        this.state = { ...initialState }

        this.updateDetails = this.updateDetails.bind(this)
        this.handleAdd = this.handleAdd.bind(this)
        this.editUser = this.editUser.bind(this)
        this.handleEdit = this.handleEdit.bind(this)
        this.backToAdd = this.backToAdd.bind(this)
    }

    updateDetails(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    editUser(user) {
        this.setState({
            addingUser: false,
            editingUser: true,
            id: user.id,
            name: user.name,
            profile_pic: user.profile_pic,
            agility: user.agility,
            phrase: user.phrase
        })
    }

    backToAdd () {
        this.setState({...initialState})
    }

    handleAdd(e) {
        e.preventDefault()
        if (this.state.name === '') { // handle name requirement
            this.setState({ errorMessage: 'Please fill this out' })
            return
        } else delete this.state.errorMessage

        const user = {
            account_id: this.props.auth.user.id,
            name: this.state.name,
            agility: this.state.agility,
            phrase: this.state.phrase,
            profile_pic: this.state.profile_pic
        }
        this.props.dispatch(addUser(user))
        this.setState({ ...initialState })
    }

    handleEdit(e) {
        e.preventDefault()
        if (this.state.name === '') { // handle name requirement
            this.setState({ errorMessage: 'Please fill this out' })
            return
        } else delete this.state.errorMessage

        const user = {
            id: this.state.id,
            account_id: this.props.auth.user.id,
            name: this.state.name,
            agility: this.state.agility,
            phrase: this.state.phrase,
            profile_pic: this.state.profile_pic
        }
        this.props.dispatch(editUser(user))
        this.setState({ ...initialState })
    }

    render() {
        return (
            <React.Fragment>
                {this.state.addingUser &&
                    <React.Fragment>
                        <div className='column is-12'>
                            <h2 className='title is-2'>Add a person</h2>
                        </div>

                        <div className='column is-6'>
                            <form className='form'>
                                <label className='label'>Name
                            <input className='input' type="text" name='name' value={this.state.name} onChange={this.updateDetails} />
                                </label>
                                {this.state.errorMessage && <p className='has-text-danger'>{this.state.errorMessage}!</p>}

                                <label className='label'>Profile pic
                            <input className='input' type="text" name='profile_pic' value={this.state.profile_pic} onChange={this.updateDetails} />
                                </label>

                                <label className='label'>Agility
                            <input className='input' type="text" name='agility' value={this.state.agility} onChange={this.updateDetails} />
                                </label>

                                <label className='label'>Key phrase
                            <input className='input' type="text" name='phrase' value={this.state.phrase} onChange={this.updateDetails} />
                                </label>
                                <p className='small-space'>If you don't give them a profile pic, a random gif will be used - hopefully it will be awesome.</p>
                                <h1 className='title is-1'><button className='small-space btn btn--stripe btn--radius centered btn--large' onClick={this.handleAdd}>SUBMIT</button></h1>
                            </form>
                        </div>
                    </React.Fragment>
                }

                {this.state.editingUser &&
                    <React.Fragment>
                        <div className='column is-12'>
                            <h2 className='title is-2'>Edit {this.state.name}</h2>
                        </div>
                        <div className='column is-6'>
                            <form className='form'>
                                <label className='label'>Name
                            <input className='input' type="text" name='name' value={this.state.name} onChange={this.updateDetails} />
                                </label>
                                {this.state.errorMessage && <p className='has-text-danger'>{this.state.errorMessage}!</p>}

                                <label className='label'>Profile pic
                            <input className='input' type="text" name='profile_pic' value={this.state.profile_pic} onChange={this.updateDetails} />
                                </label>

                                <label className='label'>Agility
                            <input className='input' type="text" name='agility' value={this.state.agility} onChange={this.updateDetails} />
                                </label>

                                <label className='label'>Key phrase
                            <input className='input' type="text" name='phrase' value={this.state.phrase} onChange={this.updateDetails} />
                                </label>
                                <p className='small-space'>If you don't give them a profile pic, a random gif will be used - hopefully it will be awesome.</p>
                                <h1 className='title is-1'><button className='small-space btn btn--stripe btn--radius centered btn--large' onClick={this.handleEdit}>SUBMIT</button></h1>
                                <p className='has-text-centered'><Link to='profile' onClick={this.backToAdd}>Cancel</Link></p>
                            </form>
                        </div>
                    </React.Fragment>
                }

                <div className='column is-6'>
                    {
                        this.props.users.users.length < 1
                            ? <p>No people yet!</p>
                            : <p>Click person to edit</p>
                    }
                    {this.props.users.users.map((p) => {
                        return <li key={p.id} onClick={() => this.editUser(p)}><Link to="/profile">{p.name}</Link></li>
                    })}
                    <p>Total people: {this.props.users.users.length}</p>
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = ({ auth, users, groups }) => ({ auth, users, groups })
export default connect(mapStateToProps)(PeopleEdit)