const express = require('express')
const makeTeams = require('../teams')

const router = express.Router()

router.post('/', (req, res) => {
  let { rawTeams, users } = req.body
  return makeTeams(users, rawTeams)
    .then(finalTeams => {
      res.status(200).json(finalTeams)
    })
    .catch(err => {
      res.status(500).json({message: 'Server error making teams'})
    })
})

module.exports = router