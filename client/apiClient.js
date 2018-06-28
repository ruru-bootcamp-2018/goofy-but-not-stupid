import request from 'superagent'

const rootUrl = '/api/v1/'

export function getUsers () {
  return request.get(rootUrl)
    .then(res => {
      console.log(res)
      return res
    })
}

export function getPairings (name) {
  return request.get(rootUrl+name)
    .then(res => {
      console.log(res)
      return res
    })
}
