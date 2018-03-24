const initialState = []
export default function songmore (state = initialState, action) {
    switch(action.type) {
        case "LOAD_MORE" :
            const newstate = state
            newstate.push(action.data)
            return newstate
        default :
            return state
    }
}