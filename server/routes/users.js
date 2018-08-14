const express = require('express')
const db = require('../db')
const makeTeams = require('../teams')
const api = require('../api')

const router = express.Router()

router.post('/team', (req, res) => {
  let teams = req.body.rawTeams
  db.getUsers()
    .then(cohort => {
      return makeTeams(cohort, teams)
        .then(finalTeams => {
          res.json(finalTeams)
        })
    })
    .catch(err => {
      console.log(err)
    })
})

router.get('/', (req, res) => {
  
  db.getUsers()
    .then(users => {
      res.json({users})
    })
})

router.get('/poki', (req, res) => {
  api.getPoki()
    .then((poki) => {
      res.json(poki)
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
