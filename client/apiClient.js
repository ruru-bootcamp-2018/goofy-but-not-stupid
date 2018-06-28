import request from 'superagent'

const rootUrl = '/api/v1/'

export function getUsers () {
  return request.get(`${rootUrl}users`)
    .then(res => {
      console.log(res)
      return res.body
    })
}

export function getPairings (name) {
  return request.get(rootUrl+name)
    .then(res => {
      console.log(res)
      return res
    })
}
