import * as types from "../actions/actionTypes";
import * as alerts from "../../utils/alertUtils";
import initialState from "./initialState";

export default (state = initialState.playlists, action) => {
    var playlists = {}
    switch (action.type) {
        // When the playlists are loaded, normalize data for the store
        case types.LOAD_PLAYLISTS_SUCCESS:
            // Join playlists in a new object to avoid modifying the state
            playlists = {}
            for (var i = 0; i < action.playlists.length; i++) {
                var p = action.playlists[i]
                playlists[p.id] = p
            }
            // Return mixed with the state
            return {
                ...state,
                byId : playlists
            }
        case types.ADD_SONGS_TO_PLAYLIST_RESULT:
            var lastUpdateOperationResult = {}
            // Check if there were pending songs to add
            if( action.songsToAdd > 0 ) {
                // Check if the request was successful
                if( action.requestStatus ) {
                    // Build message
                    let msg = `${action.songsToAdd} song(s) added to ${action.playlist.name}.`
                    if( action.songsToAdd !== action.songsRequestedToAdd ) {
                        msg += ` ${action.songsRequestedToAdd - action.songsToAdd} already added.`
                    }
                    lastUpdateOperationResult = {
                        result : alerts.SUCCESS,
                        message : msg
                    }
                }
                else {
                    // Build error message
                    let msg = `Unable to add ${action.songsToAdd} song(s) to ${action.playlist.name}.`
                    if( action.songsToAdd !== action.songsRequestedToAdd ) {
                        msg += ` ${action.songsRequestedToAdd - action.songsToAdd} already added.`
                    }
                    lastUpdateOperationResult = {
                        result : alerts.ERROR,
                        message : msg
                    }
                }
            }
            else {
                // Build warning message saying that there was no need to add anything
                lastUpdateOperationResult = {
                    result : alerts.WARNING,
                    message : `All song(s) already in ${action.playlist.name}`
                }
            }
            // Update state
            return {
                lastUpdateOperationResult : lastUpdateOperationResult,
                byId: {
                    ...state.byId,
                    [action.playlist.id] : {
                        ...action.playlist,
                        songCount : action.playlist.songCount + action.songsToAdd
                    }
                }
            }
        case types.REMOVE_SONGS_FROM_PLAYLIST_RESULT:
            // If the songs were successfully removed, update the songs list
            if( action.result ) {
                // Update count in current playlist
                return {
                    ...state,
                    byId: {
                        ...state.byId,
                        [action.playlist.id] : {
                            ...action.playlist,
                            songCount : action.playlist.songCount - action.removedSongs.length
                        }
                    }
                }
            }
            else {
                return {
                    ...state,
                    lastUpdateOperationResult : {
                        result : alerts.ERROR,
                        message : `Could not remove ${action.removedSongs.length} songs from ${action.playlist.name}`
                    }
                }
            }
        case types.DELETE_PLAYLIST_RESULT:
            if( action.result ) {
                let playlistsWithoutDeleted = {...state.byId}
                delete playlistsWithoutDeleted[action.playlist.id]
                return {
                    ...state,
                    byId: playlistsWithoutDeleted
                }
            }
            return state
        case types.LOGOUT_USER:
            return initialState.playlists
        default:
            return state
    }
}