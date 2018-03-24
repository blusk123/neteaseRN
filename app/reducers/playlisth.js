import * as actionTypes from '../constants/playlisth'

const initialState = {
    isFetching: false,
    data: {}
}

export default function playlisth(state = initialState, action) {
	switch (action.type) {
		case actionTypes.pending:
			return {...state, isFetching: true}
		case actionTypes.success: 
			return {...state, isFetching: false, data: action.data}
		case actionTypes.error:
			return {...state, isFetching: false}
		default:
			return state
	}
}