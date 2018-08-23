import request from 'superagent'

export function getGroups (account_id) {
    return dispatch => {
        dispatch(requestGroups())
        return request
            .post('/api/v1/groups/')
            .send({account_id})
            .set('Accept', 'application/json')
            .then(res => {
                dispatch(receiveGroups(res.body.groups))
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

export function addGroup(group) {
    return dispatch => {
        dispatch(requestGroups())
        return request
            .post('/api/v1/groups/add')
            .send(group)
            .set('Accept', 'application/json')
            .then(res => {
                dispatch(receiveGroup(res.body))
                return
            })
            .catch(err => {
                dispatch(groupsError(err.response.body.message))
            })
    }
}

function receiveGroup (group) {
    return {
        type: 'RECEIVE_GROUP_SUCCESS',
        group
    }
}

export function delGroup(id) {
    return dispatch => {
        dispatch(requestGroups())
        return request
            .post('/api/v1/groups/del')
            .send({id})
            .set('Accept', 'application/json')
            .then(res => {
                dispatch(delGroupSuccess(id))
                return
            })
            .catch(err => {
                dispatch(groupsError(err.response.body.message))
            })
    }
}

function delGroupSuccess(id) {
    return {
        type: 'DEL_GROUP_SUCCESS',
        id
    }
}