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
      // next step do db call to relationships table to get relevant stuff
      // then return completed userData object
    })
}

module.exports = {
  getUsers,
  getUser,
  getUserData
}
