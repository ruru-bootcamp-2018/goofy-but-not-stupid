const knex = require('knex')
const config = require('../knexfile').development

const db = knex(config)

function getUsers () {
  return db('users').select()
}

function getUser (name) {
  return db('users').select().where({name}).first()
}

function getUserData (name) {
  let userData = {}
  return getUser(name)
    .then((userInfo) => {
      userData = userInfo
      console.log(userData)
      return getUserRelationships(userData.id)
        .then((relationships) => {
          console.log({relationships})
          userData.relationships = relationships
          return userData;
        })
    })
}

function getRelationships() {
  return db('relationships').select()
}

function getUserRelationships(id) {
  return db('relationships')
    .where('id_one', id)
    .orWhere('id_two', id)
}

module.exports = {
  getUsers,
  getUser,
  getRelationships,
  getUserRelationships,
  getUserData
}
