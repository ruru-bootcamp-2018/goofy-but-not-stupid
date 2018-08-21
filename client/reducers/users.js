const initialState = {
    isFetching: false,
    users: [],
    errorMessage: null,
    fetched: false
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
                users: action.users,
                fetched: true
            }
        case 'USERS_FAILURE':
            return {
                ...state,
                isFetching: false,
                errorMessage: action.message
            }
        case 'REMOVE_USERS':
            return initialState
        case 'RECEIVE_USER_SUCCESS':
            let newUsers = state.users.map(u => u)
            newUsers.push(action.user)
            return {
                ...state,
                isFetching: false,
                users: newUsers,
                fetched: true
            }
        default:
            return state
    }
}