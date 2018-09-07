const express = require('express')
const db = require('../db')

const router = express.Router()

router.post('/', (req, res) => {
  const account_id = req.body.account_id
  db.getRelationships(account_id)
    .then(relationships => {
      res.status(200).json({ relationships })
    })
    .catch(err => {
      res.status(500).json({message: 'Server error while attempting to fetch groups'})
    })
})

module.exports = router
