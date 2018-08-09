import request from 'superagent'

import {receiveLogin} from './login'
import {saveUserToken} from '../utils/auth'

const rootUrl = '/api/v1/'

///

export function registerUserRequest(creds) {
    return (dispatch) => {
        dispatch(requestRegister())
        return request
            .post(rootUrl + 'auth/login')
            .send(creds)
            .set('Accept', 'application/json')
            .then(res => {
                const userInfo = saveUserToken(res.body.token) 
                dispatch(receiveLogin(userInfo))
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