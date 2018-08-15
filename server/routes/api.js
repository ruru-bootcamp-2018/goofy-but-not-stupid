const express = require('express')
const api = require('../api')

const router = express.Router()

router.get('/poki', (req, res) => {
    api.getPoki()
        .then((poki) => {
            res.json(poki)
        })
})