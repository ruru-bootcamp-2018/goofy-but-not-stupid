const knex = require('knex')
const config = require('../knexfile').development
const db = knex(config)

function getUsers(account_id) {
  return db('users')
    .where({ account_id })
}

// function getUser(name) {
//   return db('users').select().where({ name }).first()
// }

// function getUserData (name) {
//   let userData = {}
//   return getUser(name)
//     .then((userInfo) => {
//       userData = userInfo
//       return getUserRelationships(userData.id)
//         .then((relationships) => {
//           userData.relationships = relationships
//           return userData;
//         })
//     })
//   }

function addUser(user) {
  if (user.profile_pic === '') user.profile_pic = 'images/bone-ice-cream-detail_2.jpg'
  return db('users')
    .insert(user)
    .then(inserts => {
      // TODO: double check - want it to return the user with their new id
      return db('users')
        .where(user)
        .first()
    })
}

function editUser(user) {
  const id = user.id
  return db('users')
    .where({id})
    .update(user)
}

function delUser(id) {
  return db('users')
    .where({id})
    .del()
}

function getGroups(account_id) {
  return db('groups')
    .where({account_id})
    .then(groupsArray => {
      return groupsArray.map(g => JSON.parse(g.people))
    })
}

function addGroup(group) {
  JSON.stringify(group.people)
  return db('groups')
    .insert(group)
    .then(inserts => {
      // TODO: double check - want it to return the group with their new id
      return db('groups')
        .where(group)
        .first()
    })
}

function editGroup(group) {
  const id = group.id
  return db('groups')
    .where({id})
    .update(group)
}

function delGroup(id) {
  return db('groups')
    .where({id})
    .del()
}

function getRelationships(account_id) {
  return db('relationships')
    .where({ account_id })
}

// function getUserRelationships(id) {
//   return db('relationships')
//     .where('id_one', id)
//     .orWhere('id_two', id)
// }

function accountExists(account) {
  return db('accounts')
    .where(account)
    .then(accountOrNot => {
      // TODO: double check
      if (accountOrNot) return true; else return false
    })
}

function getAccountByUsername(username) {
  return db('accounts')
    .where({ username })
    .first()
}

function createAccount(account) {
  return db('accounts')
    .insert(account)
}

module.exports = {
  getUsers,
  // getUser,
  addUser,
  editUser,
  delUser,
  getGroups,
  addGroup,
  editGroup, 
  delGroup,
  getRelationships,
  // getUserRelationships,
  // getUserData,
  accountExists,
  getAccountByUsername,
  createAccount
}