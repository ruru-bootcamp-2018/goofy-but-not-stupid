const express = require('express')
const db = require('../db')
const makeTeams = require('../teams')

const router = express.Router()

router.post('/', (req, res) => {
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