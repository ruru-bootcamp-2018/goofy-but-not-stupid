const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')

const userRoutes = require('./routes/users')

const server = express()

server.use(express.static(path.join(__dirname, 'public')))
server.use(bodyParser.json())

server.use('/api/v1/users', userRoutes)

module.exports = server
