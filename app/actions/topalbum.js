import { getTopAlbum } from '../fetch/fetch' 
import * as actionTypes from '../constants/topalbum'

const thunkFetchData = getData => (items) => dispatch => {
	dispatch({type:actionTypes.pending})
	return getData(items).then(res => {
		dispatch({type: actionTypes.success, data: res})
	})
}
export const getTopAl = thunkFetchData(getTopAlbum)