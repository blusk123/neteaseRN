const initialIndex = null
export default function mcindex(state = initialIndex, action) {
    switch(action.type){
        case 'UPDATE_MC_INDEX':
            return action.data
        default:
            return state
    }
}