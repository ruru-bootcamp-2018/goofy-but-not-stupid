const express = require('express')
const db = require('../db')
const router = express.Router()

// const cohort = {
//   1: 'Dan',
//   2: 'Rebecca D',
//   3: 'Riki',
//   4: 'Reuben',
//   5: 'Brad',
//   6: 'Cate',
//   7: 'Tay',
//   8: 'Rebecca L',
//   9: 'Ross',
//   10: 'Stan',
//   11: 'Anton',
//   12: 'Hayden',
//   13: 'Kelly',
//   14: 'Phoenix',
//   15: 'Cliff'
// }

router.get('/', (req, res) => {
  db.getUsers()
    .then(users => {
      // console.log(users)
      res.json({users})
    })
})

router.get('/:name', (req, res) => {
  console.log('made it to server side')
  let name = req.params.name
  db.getUserData(name)
    .then(userData => {
      res.json(userData)
    })
})

module.exports = router