import request from 'superagent'

function receiveRelationships (relationships) {
    return {
        type: 'RELATIONSHIPS_SUCCESS',
        relationships
    }
}

function relationshipsError (message) {
    return {
        type: 'RELATIONSHIPS_FAILURE',
        message
    }
}

function requestRelationships () {
    return {
        type: 'RELATIONSHIPS_REQUEST'
    }
}

export function getRelationships (account_id) {
  return dispatch => {
    dispatch(requestRelationships(account_id))
      return request
        .post(`/api/v1/relationships/`)
        .send({account_id})
        .set('Accept', 'application/json')
        .then(res => {
            const relationships = res.body.relationships
            dispatch(receiveRelationships(relationships))
            return
        })
        .catch(err => {
          dispatch(relationshipsError(err.response.body.message))
        })
    }
}
