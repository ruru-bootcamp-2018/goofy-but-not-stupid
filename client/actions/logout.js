import { removeUser } from '../utils/auth'


export function logoutUser() {
    return dispatch => {
        dispatch(requestLogout())
        dispatch(removeUser())
        dispatch(receiveLogout())
        goToHome()
    }
}

function requestLogout() {
    return {
        type: 'LOGOUT_REQUEST'
    }
}

function receiveLogout() {
    return {
        type: 'LOGOUT_SUCCESS'
    }
}

function goToHome() {
    document.location = '/#/'
}