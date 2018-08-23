import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { addGroup, delGroup } from '../actions/groups'

const initialState = {
  name: '',
  people: []
}

class GroupEdit extends React.Component {
  constructor(props) {
    super(props)
    this.state = {...initialState}

    this.updateDetails = this.updateDetails.bind(this)
    this.removeUser = this.removeUser.bind(this)
    this.addUser = this.addUser.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.deleteGroup = this.deleteGroup.bind(this)
  }

  updateDetails(e) {
    this.setState({ [e.target.name]: e.target.value })
  }

  removeUser(user) {
    this.setState({
      people: this.state.people.filter(p => p.id != user.id)
    })
  }

  addUser(user) {
    let inGroup = false
    this.state.people.forEach(p => {
      if (p.id === user.id) inGroup = true
    })
    if (inGroup) {
      alert(`${user.name} is already in this group`)
      return
    }
    else {
      this.setState({
        people: [...this.state.people, user]
      })
    }
  }

  handleSubmit(e) {
    e.preventDefault()
    if (this.state.people.length < 2) {
      this.setState({ errorMessage: 'Group must contain more than one person!' })
      return
    } else if (this.state.name === '') { // handle name requirement
      this.setState({ errorMessage: 'Please give this group a name' })
      return
    } else delete this.state.errorMessage

    const group = {
      account_id: this.props.auth.user.id,
      name: this.state.name,
      people: this.state.people
    }
    this.props.dispatch(addGroup(group))
    this.setState({ ...initialState })
  }

  deleteGroup(groupId) {
    this.props.dispatch(delGroup(groupId))
  }

  render() {
    console.log(this.props.groups.groups)
    return (
      <React.Fragment>
        {this.props.users.users.length < 1
          ? <React.Fragment>
            <div className='column is-12'>
              <p className='has-text-centered'>You need to <Link to='/profile' onClick={() => this.props.goToPeopleTab()}>add some people!!</Link></p>
            </div>
            <div className='column is-12'>
              <img src="http://internationalrescue.com/wp-content/uploads/2014/05/21-international-rescue-illustrator-toby-morris.gif" alt="toby morris's deal with it thingy" />
              <p>Credit - Toby Morris</p>
            </div>
          </React.Fragment>

          : <React.Fragment>
            <div className='column is-12'>
              <h1 className="title is-1">Add group</h1>
              {this.props.auth.errorMessage && <p className="has-text-centered">{this.props.groups.errorMessage}</p>}
              {this.state.errorMessage && <p className='has-text-danger'>{this.state.errorMessage}!</p>}
            </div>

            <div className='column is-6'>
              <form className='form'>

                <label className='label'>Group name
									<input required className="input" placeholder="e.g. the swiss potatoes" type="text" name="name" onChange={this.updateDetails} />
                </label>

                <label className='label'>People</label>
                <br />
                {this.state.people.length === 0
                  ? <React.Fragment>
                    <p>...</p>
                  </React.Fragment>

                  : <React.Fragment>
                    <p>Click person remove them</p>
                    {this.state.people.map(p => {
                      return <li key={p.id}><Link to='/profile' onClick={() => this.removeUser(p)}>{p.name}</Link></li>
                    })}
                  </React.Fragment>
                }
                <br />
                <p>Total in group: {this.state.people.length}</p>
                <h1 className='title is-1'><button className='small-space btn btn--stripe btn--radius centered btn--large' onClick={this.handleSubmit}>SUBMIT</button></h1>
              </form>
            </div>

            <div className='column is-6'>
              <p>Click person to add to group</p>
              {this.props.users.users.map((p) => {
                return <li key={p.id} onClick={() => this.addUser(p)}><Link to="/profile">{p.name}</Link></li>
              })}
            </div>
          </React.Fragment>
        }


        <div className='column is-12'>
          <hr />
          <h1 className='title is-1'>Past groups</h1>
        </div>
        <div className='column is-12'>
          <p>Click group to delete! Be careful, I could not be bothered coding safety measures - it's been a long day</p>
          {this.props.groups.groups.length < 1
            ? <React.Fragment>
              <p>...</p>
            </React.Fragment>

            : <React.Fragment>
              {this.props.groups.groups.map(g => {
                return <li key={g.id} onClick={() => this.deleteGroup(g.id)}><Link to="/profile">{g.name}</Link></li>
              })}
            </React.Fragment>
          }
        </div>

      </React.Fragment>
    )
  }
}

const mapStateToProps = ({ auth, users, groups }) => ({ auth, users, groups })
export default connect(mapStateToProps)(GroupEdit)