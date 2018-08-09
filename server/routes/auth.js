const express = require('express')
const db = require('../db')
const router = express.Router()

const issueToken = require('../auth/token')

///

router.post('/login', login, issueToken)

function login (req, res, next) {
    const account = req.body
    db.accountExists(account)
        .then(exists => {
            exists 
                ? next()
                : res.status(403).json({message: 'Invalid credentials'}) 
        })
        .catch(err => {
            res.status(500).json({message: 'Server error while attempting to login'})
        })
}

router.post('/register', register, issueToken)

function register (req, res, next) {
    const account = req.body
    db.getAccountByUsername(account.username)
        .then(account => {
            //  DOUBLE CHECK: not sure of the truthy falsy knex first() stuff here
            if (!account) {
                db.createAccount(account)
                    .then(inserts => next())
            } else {
                res.status(403).json({message: 'Username already taken'})
            }
        })
        .catch(err => {
            res.status(500).json({message: 'Server error while attempting to register'})
        })
}