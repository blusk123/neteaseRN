import { getPlayListDetail } from '../fetch/fetch' 
import * as actionTypes from '../constants/playlistd'

const thunkFetchData = getData => (items) => dispatch => {
	dispatch({type:actionTypes.pending})
	return getData(items).then(res => {
		dispatch({type: actionTypes.success, data: res})
	})
}
export const getPlayLD = thunkFetchData(getPlayListDetail)

export const reset = () => {
	return {
		type: actionTypes.reset
	}
}