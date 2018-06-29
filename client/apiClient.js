import request from 'superagent'

const rootUrl = '/api/v1/users/'

console.log(getRandomName());

export function getUsers () {
  return request.get(rootUrl)
    .then(res => {
      // console.log(res)
      return res.body
    })
}

export function getUserData (name) {
  return request.get(rootUrl+name)
    .then(res => {
      // console.log(res.body) // should be userData obj
      console.log('back to client side')
      return res.body
    })
}

export function getTeams () {
  return request.get(rootUrl+'team')
    .then(res => {
      // console.log(res)
      return res.body
    })
}

export function getRandomName () {
  return request.post('https://api.codetunnel.net/random-nick')
  .send({})
  .then(res => {
    return res.body
  })
}
