import * as types from "./actionTypes";
import subsonic from "../../api/subsonicApi";

/* Load multiple playlists */
export function loadPlaylistsSuccess(playlists) {
    return { type: types.LOAD_PLAYLISTS_SUCCESS, playlists }
}

export function loadPlaylists() {
    return async (dispatch) => {
        const playlists = await subsonic.getPlaylists()
        dispatch(loadPlaylistsSuccess(playlists))
    }
}

export function loadOnePlaylistSuccess(playlist) {
    return { type: types.LOAD_ONE_PLAYLIST_SUCCESS, playlist }
}

export function loadOnePlaylist(id) {
    return async (dispatch) => {
        const playlist = await subsonic.getPlaylistById(id)
        dispatch(loadOnePlaylistSuccess(playlist))
    }
}

export function addSongsToPlaylist(playlistId, songs) {
    return async (dispatch) => {
        const playlist = await subsonic.addSongsToPlaylist(playlistId, songs)
        dispatch({ type: types.ADD_SONGS_TO_PLAYLIST_SUCCESS, playlist })
    }
}