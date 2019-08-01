import * as types from "./actionTypes"
import subsonic from "../../api/subsonicApi"
import { beginAsyncTask, asyncTaskSuccess, asyncTaskError } from "./apiStatusActions"

/* Load one album at a time */
export function loadAlbumSuccess(album) {
    return { type: types.LOAD_ALBUM_SUCCESS, payload: { album: album } }
}

export function loadAlbum(albumId) {
    return async (dispatch) => {
        dispatch(beginAsyncTask())
        try {
            const album = await subsonic.getAlbum(albumId)
            dispatch(loadAlbumSuccess(album))
            dispatch(asyncTaskSuccess())
        }
        catch(error) {
            console.error(error)
            dispatch(asyncTaskError())
        }
    }
}


export function clearAlbums(dispatch) {
    return {type: types.CLEAR_ALL_ALBUMS }
}