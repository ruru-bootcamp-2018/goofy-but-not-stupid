import request from 'superagent'
import { saveUserToken } from '../utils/auth'

export function loginUser(creds) {
    return dispatch => {
        dispatch(requestLogin())
        return request
            .post('/api/v1/auth/login')
            .send(creds)
            .set('Accept', 'application/json')
            .then(res => {
                const userInfo = saveUserToken(res.body.token)
                dispatch(receiveLogin(userInfo))
                goToHome()
            })
            .catch(err => {
                dispatch(loginError(err.response.body.message))
            })
    }
}

export function requestLogin(creds) {
    return {
        type: 'LOGIN_REQUEST',
    }
}

export function receiveLogin(user) {
    return {
        type: 'LOGIN_SUCCESS',
        user
    }
}

export function loginError(message) {
    return {
        type: 'LOGIN_FAILURE',
        message
    }
}

function goToHome() {
    document.location = '/#/'
}