import { getBanner } from '../fetch/fetch'
import * as actionTypes from '../constants/banner'

const thunkFetchData = getData => (items) => dispatch => {
	dispatch({type:actionTypes.pending})
	return getData(items).then(res => {
		dispatch({type: actionTypes.success, data: res})
	})
}
export const getBan = thunkFetchData(getBanner)