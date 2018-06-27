import request from 'superagent'

const rootUrl = 'https://api.chucknorris.io'
const rootUrl2 = 'https://giphy.p.mashape.com'
const rootUrl3 = 'https://community-vineapp.p.mashape.com'

export function getChuckNorris () {
  return request.get(rootUrl + '/jokes/random')
    .then(res => {
      return res.body
    })
  }

export function getGiphy () {
  return request.get(rootUrl2 + '/v1/gifs/random')
  .set("X-Mashape-Key", "QGBrLffLz2mshRdzPBx367T5Zhuvp1EBkTijsneIuO8DqZk3Bk")
    .query({
      api_key: 'dc6zaTOxFJmzC'
    })
    .then(res => {
      console.log(res.body)
      return res.body
    })
}

export function getNoMemes () {
  return request.get(rootUrl2 + '/timelines/popular')
  .set("X-Mashape-Key: QGBrLffLz2mshRdzPBx367T5Zhuvp1EBkTijsneIuO8DqZk3Bk")
    .then(res => {
      console.log(res.body)
      return res.body
    })
}

