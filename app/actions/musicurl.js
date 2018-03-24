import { getMusicUrl } from '../fetch/fetch' 
import * as actionTypes from '../constants/musicurl'

const thunkFetchData = getData => (items) => dispatch => {
	dispatch({type:actionTypes.pending})
	return getData(items).then(res => {
		dispatch({type: actionTypes.success, data: res})
	})
}
export const getMusic = thunkFetchData(getMusicUrl)