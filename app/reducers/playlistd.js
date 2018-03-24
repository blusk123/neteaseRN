import * as actionTypes from '../constants/playlistd'

const initialState = {
    isFetching: false,
    data: {}
}

export default function playlistd(state = initialState, action) {
	switch (action.type) {
		case actionTypes.pending:
			return {...state, isFetching: true}
		case actionTypes.success: 
			return {...state, isFetching: false, data: action.data}
		case actionTypes.error:
			return {...state, isFetching: false}
		case actionTypes.reset:
			return {...initialState}
		default:
			return state
	}
}