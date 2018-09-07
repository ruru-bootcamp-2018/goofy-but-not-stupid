import request from 'superagent'
import {saveUserToken} from '../utils/auth'
import {receiveLogin, loginError} from './login'

export function registerUserRequest (creds) {
  return (dispatch) => {
    request
      .post('/api/v1/auth/register')
      .send(creds)
      .then(res => {
        const userInfo = saveUserToken(res.body.token)
        dispatch(receiveLogin(userInfo))
        document.location = "/#/users"
      })
      .catch(err => dispatch(loginError(err.response.body.message)))
  }
}
