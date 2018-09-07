import {combineReducers} from 'redux'

import auth from './auth'
import users from './users'
import groups from './groups'
import nav from './nav'
import relationships from './relationships'

export default combineReducers({
  auth,
  users,
  groups,
  nav,
  relationships
})
