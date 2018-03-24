import { getUserPlayList } from '../fetch/fetch' 
import * as actionTypes from '../constants/userplaylist'

const thunkFetchData = getData => (items) => dispatch => {
	dispatch({type:actionTypes.pending})
	return getData(items).then(res => {
		dispatch({type: actionTypes.success, data: res})
	})
}
export const getUserPL = thunkFetchData(getUserPlayList)