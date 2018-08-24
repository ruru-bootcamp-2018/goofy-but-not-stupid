const jwt = require('jsonwebtoken')
const db = require('../db')

function issue(req, res) {
    db.getAccountByUsername(req.body.username)
        .then(account => {
            const token = createToken(account, process.env.JWT_SECRET)
            res.status(200).json({
                message: 'Authentication successful',
                token
            })
        })
        .catch(err => {
            return res.status(403).json({
                message: `Authentication failed: ${err.message}`
            })
        })
}

function createToken(account, secret) {
    return jwt.sign({
        username: account.username,
        id: account.id,
    }, secret, {
            expiresIn: '10d'
        })
}

module.exports = issue