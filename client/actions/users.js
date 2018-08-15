import request from 'superagent'

export function getUsers (account_id) {
    return dispatch => {
        dispatch(requestUsers())
        return request
            .post('/api/v1/users/')
            .send({account_id})
            .set('Accept', 'application/json')
            .then(res => {
                const users = res.body.users
                dispatch(receiveUsers(users))
            })
            .catch(err => {
                dispatch(usersError(err.response.body.message))
            })
    }
}

function requestUsers () {
    return {
        type: 'USERS_REQUEST'
    }
}

function receiveUsers (users) {
    return {
        type: 'USERS_SUCCESS',
        users
    }
}

function usersError (message) {
    return {
        type: 'USERS_FAILURE',
        message
    }
}