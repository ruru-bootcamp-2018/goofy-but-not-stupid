const express = require('express')
const db = require('../db')

const router = express.Router()

router.get('/relationships/:id', (req, res) => {
  let id = req.params.id
  db.getRelationships(id)
  .then(relationships => {
    res.status(200).json({ relationships })
  })
})

module.exports = router
