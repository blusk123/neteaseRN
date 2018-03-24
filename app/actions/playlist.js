import { getPlayList } from '../fetch/fetch' 
import * as actionTypes from '../constants/playlist'

const thunkFetchData = getData => (items) => dispatch => {
	dispatch({type:actionTypes.pending})
	return getData(items).then(res => {
		dispatch({type: actionTypes.success, data: res})
	})
}
export const getPlayL = thunkFetchData(getPlayList)