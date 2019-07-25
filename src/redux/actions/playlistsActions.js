import * as types from "./actionTypes";
import subsonic from "../../api/subsonicApi";
import { beginApiCall, apiCallSuccess } from "./apiStatusActions";

/* Load multiple playlists */
export function loadPlaylistsSuccess(playlists) {
    return { type: types.LOAD_PLAYLISTS_SUCCESS, playlists }
}

export function loadPlaylists() {
    return async (dispatch) => {
        dispatch(beginApiCall())
        const playlists = await subsonic.getPlaylists()
        dispatch(loadPlaylistsSuccess(playlists))
        dispatch(apiCallSuccess())
    }
}

export function addSongsToPlaylist(playlistMetadata, songs) {
    return async (dispatch) => {
        dispatch(beginApiCall())
        // Check if there are any songs that already exist in the playlist to prevent duplicates
        const playlist = await subsonic.getPlaylistById(playlistMetadata.id)
        const currentSongs = playlist.entry ? new Set(playlist.entry.map(song => song.id)) : new Set()
        const songsToAdd = songs.filter(song => !currentSongs.has(song.id))
        // Only add songs that are not in the playlist
        // If all songs are already in the playlist, don't do anything
        let summary = { type: types.ADD_SONGS_TO_PLAYLIST_RESULT, playlist: playlistMetadata, songsRequestedToAdd : songs.length, songsToAdd: songsToAdd.length }
        if( songsToAdd.length > 0 ) {
            const result = await subsonic.addSongsToPlaylist(playlist.id, songsToAdd.map(s => s.id))
            summary["requestStatus"] = result
        }
        dispatch(summary)
        dispatch(apiCallSuccess())
    }
}

export function removeSongsFromPlaylist(playlist, songIndexes) {
    return async (dispatch) => {
        dispatch(beginApiCall())
        const result = await subsonic.removeSongsFromPlaylist(playlist.id, songIndexes)
        dispatch({ type: types.REMOVE_SONGS_FROM_PLAYLIST_RESULT, playlist: playlist, removedSongs: songIndexes, result : result })
        dispatch(apiCallSuccess())
    }
}

export function deletePlaylist(playlist) {
    return async (dispatch) => {
        dispatch(beginApiCall())
        const result = await subsonic.deletePlaylist(playlist.id)
        dispatch({ type: types.DELETE_PLAYLIST_RESULT, playlist:playlist, result : result })
        dispatch(apiCallSuccess())
    }
}


export function createPlaylist(name) {
    return async (dispatch) => {
        dispatch(beginApiCall())
        const result = await subsonic.createPlaylist(name)
        // Reload the playlists
        if( result ) {
            // We can't directly add to the playlist because Subsonic API doesnt return the ID
            const playlists = await subsonic.getPlaylists()
            dispatch(loadPlaylistsSuccess(playlists))
        }
        dispatch(apiCallSuccess())
    }
}


export function editPlaylist(id, name, comment, isPublic) {
    return async (dispatch) => {
        dispatch(beginApiCall())
        const result = await subsonic.updatePlaylist(id, name, comment, isPublic)
        // Edit playlist in state
        if( result ) {
            dispatch({type: types.EDIT_PLAYLIST_RESULT, id:id, name:name, comment:comment, public:isPublic})
        }
        dispatch(apiCallSuccess())
    }
}

export function loadSinglePlaylist(id) {
    return async (dispatch) => {
        dispatch({type : types.LOAD_SINGLE_PLAYLIST_REQUEST, id:id})
        dispatch(beginApiCall())
        const playlist = await subsonic.getPlaylistById(id)
        if( playlist ) {
            dispatch({type: types.LOAD_SINGLE_PLAYLIST_SUCCESS, id:id, songs : playlist.entry || []})
        }
        dispatch(apiCallSuccess())
    }
}