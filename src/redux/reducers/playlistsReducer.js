import * as types from "../actions/actionTypes";
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
            // Check if there were pending songs to add
            const songsAdded = action.songsAdded
            // Update state
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [action.playlist.id] : {
                        ...action.playlist,
                        songCount : action.playlist.songCount + songsAdded.length,
                        duration: action.playlist.duration + action.songsAdded.reduce( (a,b) => ({duration: a.duration+b.duration}), {duration:0} ).duration
                    }
                }
            }
        case types.REMOVE_SONGS_FROM_PLAYLIST_RESULT:
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
        case types.DELETE_PLAYLIST_RESULT:
            let playlistsWithoutDeleted = {...state.byId}
            delete playlistsWithoutDeleted[action.playlist.id]
            return {
                ...state,
                byId: playlistsWithoutDeleted
            }
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