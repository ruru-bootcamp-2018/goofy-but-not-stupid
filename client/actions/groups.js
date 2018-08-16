import request from 'superagent'

export function getGroups (account_id) {
    return dispatch => {
        dispatch(requestGroups())
        return request
            .post('/api/v1/groups/')
            .send({account_id})
            .set('Accept', 'application/json')
            .then(res => {
                const groups = res.body.groups
                dispatch(receiveGroups(groups))
                return
            })
            .catch(err => {
                dispatch(groupsError(err.response.body.message))
            })
    }
}

function requestGroups () {
    return {
        type: 'GROUPS_REQUEST'
    }
}

function receiveGroups (groups) {
    return {
        type: 'GROUPS_SUCCESS',
        groups
    }
}

function groupsError (message) {
    return {
        type: 'GROUPS_FAILURE',
        message
    }
}