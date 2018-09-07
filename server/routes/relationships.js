const express = require('express')
const db = require('../db')

const router = express.Router()

router.get('/relationships', (req, res) => {
  db.getRelationships()
  .then(relationships => {
    res.status(200).json({ relationships })
  })
})

module.exports = router
