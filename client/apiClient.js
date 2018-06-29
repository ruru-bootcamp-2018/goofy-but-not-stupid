import request from 'superagent'

const rootUrl = '/api/v1/users/'

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
  return request.get(rootUrl+'teams')
    .then(res => {
      // console.log(res)
      return res.body
    })
}
