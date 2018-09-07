import request from 'superagent'

// export const receiveRelationships = (relationships) => {
//   return {
//     type: 'RECEIVE_RELATIONSHIPS',
//     relationships
//   }
// }
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

// export function getRelationships (id) {
//   return (dispatch) => {
//     request
//     .get(`/api/v1/relationships/${id}`)
//     .then(res => {
//       dispatch(receiveRelationships(res.body))
//     })
//   }
// }

export function getRelationships (account_id) {
    return dispatch => {
        dispatch(requestRelationships(account_id))
        return request
            .post(`/api/v1/relationships/`)
            .send({account_id})
            .set('Accept', 'application/json')
            .then(res => {
                console.log(res.body);
                const relationships = res.body.relationships
                dispatch(receiveRelationships(relationships))
                return
            })
            .catch(err => {
              dispatch(relationshipsError(err.response.body.message))
            })
    }
}
