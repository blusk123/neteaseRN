const initialState = {}
export default function mainnav (state = initialState, action) {
    switch(action.type) {
        case "UPDATE" :
            return {...state, navigation: action.data}
        default :
            return state
    }
}