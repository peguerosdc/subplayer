import * as types from "./actionTypes";
import subsonic from "../../api/subsonicApi";

/* Load single album */
export function loadAlbumSuccess(album) {
    return { type: types.LOAD_ALBUM_SUCCESS, album };
}

export function loadAlbum(id) {
    return async (dispatch) => {
        const album = await subsonic.getAlbum(id);
        dispatch(loadAlbumSuccess(album));
    };
}