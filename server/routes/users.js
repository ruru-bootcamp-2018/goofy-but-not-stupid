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

module.exports = router
