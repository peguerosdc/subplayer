import * as types from "./actionTypes";
import * as alerts from "../../utils/alertUtils";
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
        // Check if the song already exists
        const playlist = await subsonic.getPlaylistById(playlistId)
        // songs[0].id works only for one song by now. When implementing multiple songs,
        // this will need to filter out the songs already in the playlist and add the other ones
        if( playlist.entry.find(song => song.id === songs[0].id) ){
            const msg = `${songs.length} song already in playlist`
            dispatch({ type: types.ADD_SONGS_TO_PLAYLIST_RESULT, msg, status: alerts.WARNING })
        }
        else {
            const result = await subsonic.addSongsToPlaylist(playlistId, songs.map(s => s.id))
            const msg = `${songs.length} songs ${result? "" : "not "}added to playlist!`
            dispatch({ type: types.ADD_SONGS_TO_PLAYLIST_RESULT, msg, status: result ? alerts.SUCCESS : alerts.ERROR })
        }
    }
}