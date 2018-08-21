import { removeUser } from '../utils/auth'


export function logoutUser() {
    return dispatch => {
        dispatch(requestLogout())
        removeUser() // removes token from localStorage
        dispatch(removeUsers()) // removes account's associated users from redux
        dispatch(removeGroups()) // removes account's associated groups from redux
        dispatch(receiveLogout()) // reoves account from redux
    }
}

function requestLogout() {
    return {
        type: 'LOGOUT_REQUEST'
    }
}

function removeUsers() {
    return {
        type: 'REMOVE_USERS'
    }
}

function removeGroups() {
    return {
        type: 'REMOVE_GROUPS'
    }
}

function receiveLogout() {
    return {
        type: 'LOGOUT_SUCCESS'
    }
}
