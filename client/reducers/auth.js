import { isAuthenticated } from '../utils/auth'

const initialState = {
    isFetching: false,
    isAuthenticated: isAuthenticated(),
    user: null,
}

export default function auth(state = initialState, action) {
    switch (action.type) {
        case 'LOGIN_REQUEST':
            return {
                ...state,
                isFetching: true,
                isAuthenticated: false,
                errorMessage: null
            }
        case 'LOGIN_SUCCESS':
            return {
                ...state,
                isFetching: false,
                isAuthenticated: true,
                user: action.user
            }
        case 'LOGIN_FAILURE':
            return {
                ...state,
                isFetching: false,
                isAuthenticated: false,
                errorMessage: action.message
            }
        case 'LOGOUT_REQUEST':
            return {
                ...state,
                isFetching: true,
                isAuthenticated: true
            }
        case 'LOGOUT_SUCCESS':
            return {
                ...state,
                isFetching: false,
                isAuthenticated: false,
                user: null
            }
        case 'REGISTER_REQUEST':
            return {
                ...state,
                isFetching: true,
                isAuthenticated: false,
                errorMessage: null
            }
        case 'REGISTER_FAILURE':
            return {
                ...state,
                isFetching: false,
                isAuthenticated: false,
                errorMessage: action.message
            }
        default:
            return state
    }
}