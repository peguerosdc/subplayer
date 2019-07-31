import * as types from "../actions/actionTypes";
import * as alerts from "../../utils/alertUtils";
import {isPlaylistMineByOwner} from "../../utils/utils";
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
                // Append a boolean to know if the playlist is mine
                p.isMine = isPlaylistMineByOwner(p.owner)
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
            const songsAdded = action.songsToAdd.length
            if( songsAdded > 0 ) {
                // Check if the request was successful
                if( action.requestStatus ) {
                    // Build message
                    let msg = `${songsAdded} song(s) added to ${action.playlist.name}.`
                    if( songsAdded !== action.songsRequestedToAdd ) {
                        msg += ` ${action.songsRequestedToAdd - songsAdded} already added.`
                    }
                    lastUpdateOperationResult = {
                        result : alerts.SUCCESS,
                        message : msg
                    }
                }
                else {
                    // Build error message
                    let msg = `Unable to add ${songsAdded} song(s) to ${action.playlist.name}.`
                    if( songsAdded !== action.songsRequestedToAdd ) {
                        msg += ` ${action.songsRequestedToAdd - songsAdded} already added.`
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
                ...state,
                lastUpdateOperationResult : lastUpdateOperationResult,
                byId: {
                    ...state.byId,
                    [action.playlist.id] : {
                        ...action.playlist,
                        songCount : action.playlist.songCount + songsAdded,
                        duration: action.playlist.duration + action.songsToAdd.reduce( (a,b) => ({duration: a.duration+b.duration}), {duration:0} ).duration
                    }
                }
            }
        case types.REMOVE_SONGS_FROM_PLAYLIST_RESULT:
            // If the songs were successfully removed, update the songs list
            if( action.result ) {
                // Remove songs in current playlist if is currently displayed
                let currentSongs = state.currentPlaylist.songs
                let deletedSongs = []
                if( action.playlist.id === state.currentPlaylist.id ) {
                    currentSongs = state.currentPlaylist.songs.filter((song, index) => !action.removedSongs.includes(index) )
                    deletedSongs = state.currentPlaylist.songs.filter((song, index) =>  action.removedSongs.includes(index) )
                }
                // Update count in current playlist
                return {
                    ...state,
                    byId: {
                        ...state.byId,
                        [action.playlist.id] : {
                            ...action.playlist,
                            songCount : action.playlist.songCount - action.removedSongs.length,
                            duration : action.playlist.duration - deletedSongs.reduce( (a,b) => ({duration: a.duration+b.duration}), {duration:0} ).duration
                        }
                    },
                    currentPlaylist : {
                        ...state.currentPlaylist,
                        songs : currentSongs
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
        case types.EDIT_PLAYLIST_RESULT:
            // Look for this playlist in the state and check if something changed
            const currentPlaylist = state.byId[action.id]
            if( currentPlaylist.name !== action.name ||
                currentPlaylist.comment !== action.comment ||
                currentPlaylist.public !== action.public ) {
                // Edit the values
                const newPlaylist = { ...currentPlaylist, name: action.name,comment: action.comment,public: action.public }
                return {
                    ...state,
                    byId: {
                        ...state.byId,
                        [action.id] : newPlaylist
                    }
                }
            }
            return state
        case types.LOAD_SINGLE_PLAYLIST_SUCCESS:
            return {
                ...state,
                currentPlaylist : {
                    id: action.id,
                    songs : action.songs
                }
            }
        case types.LOAD_SINGLE_PLAYLIST_REQUEST:
            return {
                ...state,
                currentPlaylist : {
                    id: action.id,
                    songs : []
                }
            }
        case types.LOGOUT_USER:
            return initialState.playlists
        default:
            return state
    }
}