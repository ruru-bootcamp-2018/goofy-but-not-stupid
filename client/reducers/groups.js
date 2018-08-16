const initialState = {
    isFetching: false,
    groups: [],
    errorMessage: null
}

export default function groups(state = initialState, action) {
    switch (action.type) {
        case 'GROUPS_REQUEST':
            return {
                ...state,
                isFetching: true,
                errorMessage: null
            }
        case 'GROUPS_SUCCESS':
            return {
                ...state,
                isFetching: false,
                groups: action.groups
            }
        case 'GROUPS_FAILURE':
            return {
                ...state,
                isFetching: false,
                errorMessage: action.message
            }
        default:
            return state
    }
}