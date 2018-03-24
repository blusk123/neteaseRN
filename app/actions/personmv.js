import { getPersonalizedMV } from '../fetch/fetch' 
import * as actionTypes from '../constants/personmv'

const thunkFetchData = getData => (items) => dispatch => {
	dispatch({type:actionTypes.pending})
	return getData(items).then(res => {
		dispatch({type: actionTypes.success, data: res})
	})
}
export const getPersonMV = thunkFetchData(getPersonalizedMV)