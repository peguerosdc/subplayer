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
            return Object.assign({}, state, {
                playlists : playlists
            })
        case types.LOAD_ONE_PLAYLIST_SUCCESS:
            playlists = Object.assign({}, state.playlists)
            playlists[action.playlist.id] = action.playlist
            return Object.assign({}, state, {
                playlists : playlists
            })
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
            // Update count in current playlist
            var currentPlaylist = Object.assign({}, action.playlist)
            currentPlaylist["songCount"] += action.songsToAdd
            // Copy of playlist
            var newCopy = {}
            newCopy[action.playlist.id] = currentPlaylist
            // Add count to playlists
            var tempPlaylists = Object.assign({},state.playlists)
            tempPlaylists = Object.assign(tempPlaylists, newCopy)
            // Update state
            return Object.assign({}, state, {
                lastUpdateOperationResult : lastUpdateOperationResult,
                playlists: tempPlaylists
            })
        default:
            return state
    }
}