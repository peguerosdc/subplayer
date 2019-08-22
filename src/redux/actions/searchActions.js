import * as types from "./actionTypes"
import subsonic from "../../api/subsonicApi"
import { beginAsyncTask, asyncTaskSuccess, asyncTaskError } from "./apiStatusActions"

export function searchAction(result) {
    return { type: types.SEARCH_RESULT, payload:result }
}

export function search(query) {
    return async (dispatch) => {
        dispatch(beginAsyncTask())
        try {
            const result = await subsonic.search(query)
            dispatch(searchAction(result))
            dispatch(asyncTaskSuccess())
        }
        catch(error) {
            console.error(error)
            dispatch(asyncTaskError("Unable to perform search"))
        }
    }
}