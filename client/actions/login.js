const rootUrl = '/api/v1/'
import request from 'superagent'

export function loginUser (creds) {
    return dispatch => {
        dispatch(requestLogin())
        return request
            .post(rootUrl+'auth/login')
            .send(creds)
            .set('Accept', 'application/json')
            .then(res => {
                // save user token - gets full user info
                // dispatch login received - passes full user info
            })
            .catch(err => {
                dispatch(loginError(err.response.body.message))
            })
    }
}

export function requestLogin (creds) {
    return {
        type: 'LOGIN_REQUEST',
        isFetching: true,
        isAuthenticated: false
    }
}


// gap for unwritten funcs


export function loginError(message) {
    return {
      type: 'LOGIN_FAILURE',
      isFetching: false,
      isAuthenticated: false,
      message
    }
  }

