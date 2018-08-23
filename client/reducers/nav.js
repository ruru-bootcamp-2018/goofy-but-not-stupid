const initialState = document.location.hash

export default function nav (state = initialState, action) {
    switch (action.type) {
        case 'NAVIGATE':
            return action.target
        default:
            return state
    }
}