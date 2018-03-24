import { getPlayListH } from '../fetch/fetch' 
import * as actionTypes from '../constants/playlisth'

const thunkFetchData = getData => (items) => dispatch => {
	dispatch({type:actionTypes.pending})
	return getData(items).then(res => {
		dispatch({type: actionTypes.success, data: res})
	})
}
export const getPlayLH = thunkFetchData(getPlayListH)