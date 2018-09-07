import request from 'superagent'

export const receiveRelationships = (relationships) => {
  return {
    type: 'RECEIVE_RELATIONSHIPS',
    relationships
  }
}

export function getRelationships (id) {
  return (dispatch) => {
    request
    .get(`/api/v1/relationships/${id}`)
    .then(res => {
      dispatch(receiveRelationships(res.body))
    })
  }
}
