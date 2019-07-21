import * as types from "./actionTypes";
import subsonic from "../../api/subsonicApi";

/* Load multiple artists */
export function loadArtistsSuccess(artists) {
    return { type: types.LOAD_ARTISTS_SUCCESS, artists };
}

export function loadArtists() {
    return async (dispatch) => {
        const artists = await subsonic.getArtists();
        dispatch(loadArtistsSuccess(artists));
    };
}
