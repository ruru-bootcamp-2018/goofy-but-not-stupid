function relationships (state = [], action) {
  switch (action.type) {
    case 'RECEIVE_RELATIONSHIPS':
      return action.relationships
    default:
        return state
  }
}

export default relationships
