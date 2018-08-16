const express = require('express')
const db = require('../db')

const router = express.Router()

router.post('/', (req, res) => {
  const {account_id} = req.body 
  db.getUsers(account_id)
    .then(users => {
      res.status(200).json({users})
    })
    .catch(err => {
      res.status(500).json({message: 'Server error while attempting to fetch users'})
    })
})

router.post('/add', (req, res) => {
  const user = req.body
  db.addUser(user)
    .then(userWithId => {
      res.status(200).json(userWithId)
    })
    .catch(err => {
      res.status(500).json({message: 'Server error while attempting to add user'})
    })
})

router.post('/edit', (req, res) => {
  const user = req.body
  db.editUser(user)
    .then(() => {
      res.sendStatus(200)
    })
    .catch(err => {
      res.status(500).json({message: 'Server error while attempting to edit user'})
    })
})

router.post('/del', (req, res) => {
  const id = req.body.id
  db.delUser(id)
    .then(() => {
      res.sendStatus(200)
    })
    .catch(err => {
      res.status(500).json({message: 'Server error while attempting to delete user'})
    })
})

// router.get('/:name', (req, res) => {
//   let name = req.params.name
//   db.getUserData(name)
//     .then(userData => {
//       res.json(userData)
//     })
// })

module.exports = router