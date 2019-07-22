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

export function addSongsToPlaylist(playlistMetadata, songs) {
    return async (dispatch) => {
        // Check if there are any songs that already exist in the playlist to prevent duplicates
        const playlist = await subsonic.getPlaylistById(playlistMetadata.id)
        const currentSongs = new Set(playlist.entry.map(song => song.id));
        const songsToAdd = songs.filter(song => !currentSongs.has(song.id))
        // Only add songs that are not in the playlist
        // If all songs are already in the playlist, don't do anything
        let summary = { type: types.ADD_SONGS_TO_PLAYLIST_RESULT, playlist: playlistMetadata, songsRequestedToAdd : songs.length, songsToAdd: songsToAdd.length }
        if( songsToAdd.length > 0 ) {
            const result = await subsonic.addSongsToPlaylist(playlist.id, songsToAdd.map(s => s.id))
            summary["requestStatus"] = result
        }
        dispatch(summary)
    }
}