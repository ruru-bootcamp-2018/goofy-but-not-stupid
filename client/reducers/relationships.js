const initialState = {
    isFetching: false,
    relationships: [],
    errorMessage: null,
    fetched: false
}

function relationships (state = initialState, action) {
  switch (action.type) {
    case 'RELATIONSHIPS_REQUEST':
        return {
            ...state,
            isFetching: true,
            fetched: false,
            errorMessage: null
        }
    case 'RELATIONSHIPS_SUCCESS':
        return {
            ...state,
            isFetching: false,
            relationships: action.relationships,
            fetched: true
        }
    case 'RELATIONSHIPS_FAILURE':
        return {
            ...state,
            isFetching: false,
            errorMessage: action.message
            }
    case 'RECEIVE_RELATIONSHIPS':
      return action.relationships
    default:
        return state
  }
}

export default relationships
