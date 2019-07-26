import * as types from "./actionTypes";
import subsonic from "../../api/subsonicApi";
import { beginApiCall, apiCallSuccess } from "./apiStatusActions";

export function search(query) {
    return async (dispatch) => {
        dispatch(beginApiCall())
        const result = await subsonic.search(query)
        dispatch({ type: types.SEARCH_RESULT, payload:result })
        dispatch(apiCallSuccess())
    }
}