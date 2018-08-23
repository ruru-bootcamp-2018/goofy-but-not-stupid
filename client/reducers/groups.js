const initialState = {
    isFetching: false,
    groups: [],
    errorMessage: null,
    fetched: false
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
            console.log(action.groups)
            // ternary handles no-groups case - the null is a consequence of JSON.parse()
            return {
                ...state,
                isFetching: false,
                groups: action.groups[0] === null ? [] : action.groups,
                fetched: true
            }
        case 'GROUPS_FAILURE':
            return {
                ...state,
                isFetching: false,
                errorMessage: action.message
            }
        case 'REMOVE_GROUPS':
            return initialState
        case 'RECEIVE_GROUP_SUCCESS':
            let newGroups = state.groups.map(g => g)
            newGroups.push(action.group)
            return {
                ...state,
                isFetching: false,
                groups: newGroups,
                fetched: true
            }
        case 'DEL_GROUP_SUCCESS':
            return {
                ...state, 
                isFetching: false,
                groups: state.groups.filter(g => g.id != action.id),
                fetched: true
            }
        default:
            return state
    }
}