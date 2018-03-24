import { getPersonalized } from '../fetch/fetch' 
import * as actionTypes from '../constants/personal'

const thunkFetchData = getData => (items) => dispatch => {
	dispatch({type:actionTypes.pending})
	return getData(items).then(res => {
		dispatch({type: actionTypes.success, data: res})
	})
}
export const getPerson = thunkFetchData(getPersonalized)