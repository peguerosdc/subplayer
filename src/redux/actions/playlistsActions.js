import * as types from "./actionTypes";
import * as subsonicApi from "../../api/subsonicApi";

/* Load multiple playlists */
export function loadPlaylistsSuccess(playlists) {
    return { type: types.LOAD_PLAYLISTS_SUCCESS, playlists };
}

export function loadPlaylists() {
    return async (dispatch) => {
        const playlists = await subsonicApi.getPlaylists();
        dispatch(loadPlaylistsSuccess(playlists));
    };
}

export function loadOnePlaylistSuccess(playlist) {
    return { type: types.LOAD_ONE_PLAYLIST_SUCCESS, playlist };
}

export function loadOnePlaylist(id) {
    return async (dispatch) => {
        const playlist = await subsonicApi.getPlaylistById(id);
        dispatch(loadOnePlaylistSuccess(playlist));
    };
}