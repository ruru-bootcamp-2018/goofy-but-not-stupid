const express = require('express')

const db = require('../db')

const router = express.Router()

router.get('/', (req, res) => {
  db.getUsers()
    .then(users => {
      console.log(users)
      res.json({users})
    })
})

router.get('/:name', (req, res) => {
  console.log('made it to server side')

  let name = req.params.name

  db.getUserData(name)
    .then(userData => {
      console.log(userData) // this should be completed userData
      res.json({userData})
    })
})

module.exports = router
