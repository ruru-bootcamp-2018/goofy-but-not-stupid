const initialState = {
    isFetching: false,
    users: [],
    errorMessage: null
}

export default function users(state = initialState, action) {
    switch (action.type) {
        case 'USERS_REQUEST':
            return {
                ...state,
                isFetching: true,
                errorMessage: null
            }
        case 'USERS_SUCCESS':
            return {
                ...state,
                isFetching: false,
                users: action.users
            }
        case 'USERS_FAILURE':
            return {
                ...state,
                isFetching: false,
                errorMessage: action.message
            }
        default:
            return state
    }
}