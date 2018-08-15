const express = require('express')
const db = require('../db')

const router = express.Router()

router.post('/', (req, res) => {
  const {account_id} = req.body 
  db.getUsers(account_id)
    .then(users => {
      res.json({users})
    })
})

router.get('/:name', (req, res) => {
  let name = req.params.name
  db.getUserData(name)
    .then(userData => {
      res.json(userData)
    })
})

module.exports = router