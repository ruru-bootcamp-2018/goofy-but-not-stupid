const knex = require('knex')
const config = require('../knexfile').development

const db = knex(config)

function getUsers () {
  return db('users').select()
}

function getUser (name) {
  return db('users').select().where({name})
}

module.exports = {
  getUsers,
  getUser
}
