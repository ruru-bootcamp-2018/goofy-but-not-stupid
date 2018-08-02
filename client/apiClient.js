import request from 'superagent'
const rootUrl = '/api/v1/users/'


export function getUsers () {
  return request.get(rootUrl)
    .then(res => {
      return res.body
    })
}

export function getUserData (name) {
  return request.get(rootUrl+name)
    .then(res => {
      return res.body
    })
}

export function getTeams (rawTeams) {
  return request
    .post(rootUrl+'team')
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
  // TODO convert to backend api func
  return request.get(rootUrl+'poki')
    .then(res => {
      return res.body
    })
}
