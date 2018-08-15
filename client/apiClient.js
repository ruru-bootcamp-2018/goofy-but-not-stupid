import request from 'superagent'
const rootUrl = '/api/v1/users/'


export function getUsers (account_id) {
  return request
    .post('/api/v1/users/')
    .send({account_id})
    .set('Accept', 'application/json')
    .then(res => {
      return res.body
    })
}

export function getUserData (name) {
  return request.get('/api/v1/users/'+name)
    .then(res => {
      return res.body
    })
}

export function getTeams (rawTeams) {
  return request
    .post('/api/v1/teams')
    .send({rawTeams})
    .set('Accept', 'application/json')
    .then(res => {
      return res.body.newTeams
    })
}

export function getRandomName () {
  return request.post('https://api.codetunnel.net/random-nick')
  .send({})
  .then(res => {
    return res.body
  })
}

export function getPoki () {
  return request.get('/api/v1/api/poki')
    .then(res => {
      return res.body
    })
}
