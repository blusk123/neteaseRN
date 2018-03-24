const initialState = []

export default function songs(state = initialState, action) {
    switch(action.type) {
        case "CHANGE_SONGS":
            return action.data
        default:
            return state
    }
}