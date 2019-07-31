import * as types from "./actionTypes"
import subsonic from "../../api/subsonicApi"
import { beginAsyncTask, asyncTaskSuccess, asyncTaskError } from "./apiStatusActions"

export function search(query) {
    return async (dispatch) => {
        dispatch(beginAsyncTask())
        try {
            const result = await subsonic.search(query)
            dispatch({ type: types.SEARCH_RESULT, payload:result })
            dispatch(asyncTaskSuccess())
        }
        catch(error) {
            dispatch(asyncTaskError(error.message))
        }
    }
}