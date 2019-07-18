import * as types from "./actionTypes";
import * as subsonicApi from "../../api/subsonicApi";

/* Load multiple artists */
export function loadArtistsSuccess(artists) {
    return { type: types.LOAD_ARTISTS_SUCCESS, artists };
}

export function loadArtists() {
    return async (dispatch) => {
        const artists = await subsonicApi.getArtists();
        dispatch(loadArtistsSuccess(artists));
    };
}

/* Load single artists */
export function startedLoadingArtist(id) {
    return { type: types.STARTED_LOADING_ARTIST, id };
}

export function loadArtistSuccess(artist) {
    return { type: types.LOAD_ARTIST_SUCCESS, artist };
}

export function loadArtist(id) {
    return async (dispatch) => {
        dispatch(startedLoadingArtist(id));
        const artist = await subsonicApi.getArtist(id);
        dispatch(loadArtistSuccess(artist));
    };
}