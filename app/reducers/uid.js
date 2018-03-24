export default function uid( state=null, action ) {
    switch(action.type) {
        case 'SET_UID':
            return action.data
        default:
            return state
    }
}