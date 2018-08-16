import {combineReducers} from 'redux'

import auth from './auth'
import users from './users'
import groups from './groups'

export default combineReducers({
  auth,
  users,
  groups
})