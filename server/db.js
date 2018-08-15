const knex = require('knex')
const config = require('../knexfile').development

const db = knex(config)

function getUsers(account_id) {
  return db('users').where({ account_id })
}

function getUser(name) {
  return db('users').select().where({ name }).first()
}

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

function getRelationships() {
  return db('relationships').select()
}

function getUserRelationships(id) {
  return db('relationships')
    .where('id_one', id)
    .orWhere('id_two', id)
}


function accountExists(account) {
  return db('accounts')
    .where(account)
    .then(accountOrNot => {
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
  getUser,
  getRelationships,
  getUserRelationships,
  // getUserData,
  accountExists,
  getAccountByUsername,
  createAccount
}
