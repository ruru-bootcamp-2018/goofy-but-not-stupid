const knex = require('knex')
const config = require('../knexfile').development
const db = knex(config)

function getUsers(account_id) {
  return db('users')
    .where({ account_id })
}

function addUser(user) {
  if (user.profile_pic === '') user.profile_pic = 'images/bone-ice-cream-detail_2.jpg'
  return db('users')
    .insert(user)
    .then(inserts => {
      return db('users')
        .where(user)
        .first()
    })
}

function editUser(user) {
  const { id } = user
  return db('users')
    .select()
    .where({ id })
    .update(user)
}

function delUser(id) {
  return db('users')
    .where({ id })
    .del()
}

function getGroups(account_id) {
  return db('groups')
    .where({ account_id })
    .then(groupsArray => {
      return groupsArray.map(g => {
        g.people = JSON.parse(g.people)
        return g
      })
    })
}

function addGroup(group) {
  const tempGroup = { ...group }
  tempGroup.people = JSON.stringify(tempGroup.people, null, 2)
  return db('groups')
    .insert(tempGroup)
}

function editGroup(group) {
  const id = group.id
  return db('groups')
    .where({ id })
    .update(group)
}

function delGroup(id) {
  return db('groups')
    .where({ id })
    .del()
}

function getRelationships(account_id) {
  return db('relationships')
    .where({ account_id })
}

function addRelationships(group) {
  const account_id = group.account_id
  let promises = []
  for (let i = 0; i < group.people.length - 1; i++) {
    for (let j = i + 1; j < group.people.length; j++) {
      promises.push(addRelationship(group.people[i].id, group.people[j].id, account_id))
    }
  }
  return Promise.all(promises)
}

function addRelationship(id_one, id_two, account_id) {
  let rel = { id_one, id_two }
  let reversedRel = { id_one: rel.id_two, id_two: rel.id_one }
  return db('relationships')
    .where(rel)
    .orWhere(reversedRel)
    .then(rels => {
      if (rels.length > 0) {
        return tickUpRelationship(rels[0])
      }
      else {
        rel.account_id = account_id
        rel.count = 1
        return db('relationships')
          .insert(rel)
      }
    })
}

function tickUpRelationship(rel) {
  const id = rel.id
  const count = rel.count+1
  return db('relationships')
    .select()
    .where({id})
    .update({count})
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
  addUser,
  editUser,
  delUser,
  getGroups,
  addGroup,
  editGroup,
  delGroup,
  getRelationships,
  addRelationships,
  getAccountByUsername,
  createAccount
}