import request from 'superagent'

import {receiveLogin} from './login'
import {saveUserToken} from '../utils/auth'

export function registerUserRequest(creds) {
    return (dispatch) => {
        dispatch(requestRegister())
        return request
            .post('/api/v1/auth/register')
            .send(creds)
            .set('Accept', 'application/json')
            .then(res => {
                const userInfo = saveUserToken(res.body.token) 
                dispatch(receiveLogin(userInfo))
                goToProfile()
            })
            .catch(err => {
                dispatch(registerError(err.response.body.message))
            })
    }
}

function requestRegister() {
    return ({
        type: 'REGISTER_REQUEST',
    })
}

function registerError(message) {
    return ({
        type: 'REGISTER_FAILURE',
        message
    })
}

function goToProfile() {
    document.location = '/#/profile'
}