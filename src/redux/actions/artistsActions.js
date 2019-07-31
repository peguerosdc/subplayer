import * as types from "./actionTypes"
import subsonic from "../../api/subsonicApi"
import { beginAsyncTask, asyncTaskSuccess, asyncTaskError } from "./apiStatusActions"

/* Load multiple artists */
export function loadArtistsSuccess(artists) {
    return { type: types.LOAD_ARTISTS_SUCCESS, artists }
}

export function loadArtists() {
    return async (dispatch) => {
        dispatch(beginAsyncTask())
        try {
            const artists = await subsonic.getArtists()
            dispatch(loadArtistsSuccess(artists))
            dispatch(asyncTaskSuccess())
        }
        catch(error) {
            dispatch(asyncTaskError(error.message))
        }
    }
}
