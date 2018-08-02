const express = require('express')
const db = require('../db')
const makeTeams = require('../teams')
const api = require('../api')

const tempTeamSelection = [
  {
    max: 5,
    team: []
  },
  {
    max: 5,
    team: []
  },
  {
    max: 5,
    team: []
  }
]

const router = express.Router()

router.get('/team', (req, res) => {
  let teams = [...tempTeamSelection] // will switch this route to post with the teamselection
  db.getUsers()
    .then(cohort => {
      return makeTeams(cohort, teams)
        .then(finalTeams => {
          console.log(finalTeams)
          res.json(finalTeams)
        })
    })
    .catch(err => {
      console.log(err)
    })

  // teams.processRelationships(3)
  // .then(team => {
  //   res.json(team)
  // })
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
