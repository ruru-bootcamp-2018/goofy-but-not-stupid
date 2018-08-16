const express = require('express')
const db = require('../db')

const router = express.Router()

router.post('/', (req, res) => {
  const account_id = req.body.account_id
  db.getGroups(account_id)
    .then(groups => {
      res.status(200).json({ groups })
    })
    .catch(err => {
      res.status(500).json({message: 'Server error while attempting to fetch groups'})
    })
})

router.post('/add', (req, res) => {
  const group = req.body
  db.addGroup(group)
    .then(groupWithId => {
      res.status(200).json(groupWithId)
    })
    .catch(err => {
      res.status(500).json({message: 'Server error while attempting to add group'})
    })
})

router.post('/edit', (req, res) => {
  const group = req.body
  db.editGroup(group)
    .then(() => {
      res.sendStatus(200)
    })
    .catch(err => {
      res.status(500).json({message: 'Server error while attempting to edit group'})
    })
})

router.post('/del', (req, res) => {
  const id = req.body.id
  db.delGroup(id)
    .then(() => {
      res.sendStatus(200)
    })
    .catch(err => {
      res.status(500).json({message: 'Server error while attempting to delete group'})
    })
})

module.exports = router