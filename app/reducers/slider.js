const initialState = {
    play: false
}
export default function slider(state = initialState, action) {
    switch(action.type) {
        case "SLIDER_CHANGE":
            return {...state, ...action.data}
        default:
            return state
    }
}