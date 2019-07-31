import * as types from "./actionTypes";
import subsonic from "../../api/subsonicApi";
import { beginAsyncTask, asyncTaskSuccess, asyncTaskError, asyncTaskWarning } from "./apiStatusActions";

/* Load multiple playlists */
export function loadPlaylistsSuccess(playlists) {
    return { type: types.LOAD_PLAYLISTS_SUCCESS, playlists }
}

export function loadPlaylists() {
    return async (dispatch) => {
        dispatch(beginAsyncTask())
        try {
            const playlists = await subsonic.getPlaylists()
            dispatch(loadPlaylistsSuccess(playlists))
            dispatch(asyncTaskSuccess())
        }
        catch(error) {
            dispatch(asyncTaskError(error.message))
        }
    }
}

export function addSongsToPlaylist(playlistMetadata, songs) {
    return async (dispatch) => {
        dispatch(beginAsyncTask())
        try {
            // Check if there are any songs that already exist in the playlist to prevent duplicates
            const playlist = await subsonic.getPlaylistById(playlistMetadata.id)
            const currentSongs = playlist.entry ? new Set(playlist.entry.map(song => song.id)) : new Set()
            const songsToAdd = songs.filter(song => !currentSongs.has(song.id))
            // Only add songs that are not in the playlist
            // If all songs are already in the playlist, don't do anything
            const songsAdded = songsToAdd.length
            const songsRequestedToAdd = songs.length
            if( songsAdded > 0 ) {
                const result = await subsonic.addSongsToPlaylist(playlist.id, songsToAdd.map(s => s.id))
                if( result ) {
                    // Build the success message and dispatch
                    let msg = `${songsAdded} song(s) added to ${playlistMetadata.name}.`
                    if( songsAdded !== songs.length ) {
                        msg += ` ${songs.length - songsAdded} already added.`
                    }
                    dispatch({ type: types.ADD_SONGS_TO_PLAYLIST_RESULT, playlist: playlistMetadata, songsAdded: songsToAdd })
                    dispatch(asyncTaskSuccess(msg))
                }
                else {
                    // Build error message
                    let msg = `Unable to add ${songsAdded} song(s) to ${playlistMetadata.name}.`
                    if( songsAdded !== songsRequestedToAdd ) {
                        msg += ` ${songsRequestedToAdd - songsAdded} already added.`
                    }
                    dispatch(asyncTaskError(msg))
                }
            }
            else {
                // Build warning message saying that there was no need to add anything
                dispatch(asyncTaskWarning(`All song(s) already in ${playlist.name}`))
            }
        }
        catch(error) {

            dispatch(asyncTaskError(error.message))
        }
    }
}

export function removeSongsFromPlaylist(playlist, songIndexes) {
    return async (dispatch) => {
        dispatch(beginAsyncTask())
        try {
            const result = await subsonic.removeSongsFromPlaylist(playlist.id, songIndexes)
            if( result ) {
                dispatch({ type: types.REMOVE_SONGS_FROM_PLAYLIST_RESULT, playlist: playlist, removedSongs: songIndexes })
                dispatch(asyncTaskSuccess(`${songIndexes.length} songs removed from ${playlist.name}`))
            }
            else {
                dispatch(asyncTaskError(`Could not remove ${songIndexes.length} songs from ${playlist.name}`))
            }
        }
        catch(error) {
            dispatch(asyncTaskError(error.message))
        }
    }
}

export function deletePlaylist(playlist) {
    return async (dispatch) => {
        dispatch(beginAsyncTask())
        try {
            const result = await subsonic.deletePlaylist(playlist.id)
            if( result ) {
                dispatch({ type: types.DELETE_PLAYLIST_RESULT, playlist:playlist })
                dispatch(asyncTaskSuccess(`${playlist.name} deleted!`))
            }
            else {
                dispatch(asyncTaskError(`Could not delete ${playlist.name}`))
            }
        }
        catch(error) {
            dispatch(asyncTaskError(error.message))
        }
    }
}


export function createPlaylist(name) {
    return async (dispatch) => {
        dispatch(beginAsyncTask())
        try {
            const result = await subsonic.createPlaylist(name)
            // Reload the playlists
            if( result ) {
                // We can't directly add to the playlist because Subsonic API doesnt return the ID
                const playlists = await subsonic.getPlaylists()
                dispatch(loadPlaylistsSuccess(playlists))
                dispatch(asyncTaskSuccess(`Playlist ${name} was created!`))
            }
            else {
                dispatch(asyncTaskError("Could not create playlist"))
            }
            
        }
        catch(error) {
            dispatch(asyncTaskError(error.message))
        }
    }
}


export function editPlaylist(id, name, comment, isPublic) {
    return async (dispatch) => {
        dispatch(beginAsyncTask())
        try {
            const result = await subsonic.updatePlaylist(id, name, comment, isPublic)
            // Edit playlist in state
            if( result ) {
                dispatch({type: types.EDIT_PLAYLIST_RESULT, id:id, name:name, comment:comment, public:isPublic})
                dispatch(asyncTaskSuccess("Playlist successfully edited"))
            }
            else {
                dispatch(asyncTaskError("Could not edit playlist"))
            }
            
        }
        catch(error) {
            dispatch(asyncTaskError(error.message))
        }
    }
}

export function loadSinglePlaylist(id) {
    return async (dispatch) => {
        dispatch({type : types.LOAD_SINGLE_PLAYLIST_REQUEST, id:id})
        dispatch(beginAsyncTask())
        const playlist = await subsonic.getPlaylistById(id)
        if( playlist ) {
            dispatch({type: types.LOAD_SINGLE_PLAYLIST_SUCCESS, id:id, songs : playlist.entry || []})
        }
        dispatch(asyncTaskSuccess())
    }
}