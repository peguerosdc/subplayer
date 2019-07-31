import * as types from "./actionTypes"
import subsonic from "../../api/subsonicApi"
import { beginApiCall, apiCallSuccess, apiCallError } from "./apiStatusActions"

/* Load multiple artists */
export function loadArtistsSuccess(artists) {
    return { type: types.LOAD_ARTISTS_SUCCESS, artists }
}

export function loadArtists() {
    return async (dispatch) => {
        dispatch(beginApiCall())
        try {
            const artists = await subsonic.getArtists()
            dispatch(loadArtistsSuccess(artists))
            dispatch(apiCallSuccess())
        }
        catch(error) {
            dispatch(apiCallError(error.message))
        }
    }
}
