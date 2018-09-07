const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')

const userRoutes = require('./routes/users')
const authRoutes = require('./routes/auth')
const teamsRoutes = require('./routes/teams')
const apiRoutes = require('./routes/api')
const groupsRoutes = require('./routes/groups')
const relationshipsRoutes = require('./routes/relationships')

const server = express()

server.use(express.static(path.join(__dirname, 'public')))
server.use(bodyParser.json())

server.use('/api/v1/users', userRoutes)
server.use('/api/v1/auth', authRoutes)
server.use('/api/v1/teams', teamsRoutes)
server.use('/api/v1/api', apiRoutes)
server.use('/api/v1/groups', groupsRoutes)
server.use('/api/v1/relationships', relationshipsRoutes)

module.exports = server
