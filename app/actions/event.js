import { getEvent } from '../fetch/fetch'
import * as actionTypes from '../constants/event'

const thunkFetchData = getData => (items) => dispatch => {
	dispatch({type:actionTypes.pending})
	return getData(items).then(res => {
		dispatch({type: actionTypes.success, data: res})
	})
}
export const getEve = thunkFetchData(getEvent)