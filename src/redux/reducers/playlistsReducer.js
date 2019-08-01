import * as types from "../actions/actionTypes";
import {isPlaylistMineByOwner} from "../../utils/utils";
import initialState from "./initialState";
import {createReducer} from '../../utils/redux.js';

export default createReducer(initialState.playlists, {
    [types.LOAD_PLAYLISTS_SUCCESS]: (state, payload) => {
        // Join playlists in a new object to avoid modifying the state
        var playlists = {}
        for (var i = 0; i < payload.playlists.length; i++) {
            var p = payload.playlists[i]
            // Append a boolean to know if the playlist is mine
            p.isMine = isPlaylistMineByOwner(p.owner)
            playlists[p.id] = p
            playlists[p.id].songs = []
        }
        // Return mixed with the state
        return {
            ...state,
            byId : playlists
        }
    },
    [types.ADD_SONGS_TO_PLAYLIST_RESULT]: (state, payload) => {
        // Check if there were pending songs to add
        const songsAdded = payload.songsAdded
        // Update state
        return {
            ...state,
            byId: {
                ...state.byId,
                [payload.playlist.id] : {
                    ...payload.playlist,
                    songCount : payload.playlist.songCount + songsAdded.length,
                    duration: payload.playlist.duration + payload.songsAdded.reduce( (a,b) => ({duration: a.duration+b.duration}), {duration:0} ).duration
                }
            }
        }
    },
    [types.REMOVE_SONGS_FROM_PLAYLIST_RESULT]: (state, payload) => {
        // Remove songs in current playlist if is currently displayed
        let currentSongs = state.currentPlaylist.songs
        let deletedSongs = []
        if( payload.playlist.id === state.currentPlaylist.id ) {
            currentSongs = state.currentPlaylist.songs.filter((song, index) => !payload.removedSongs.includes(index) )
            deletedSongs = state.currentPlaylist.songs.filter((song, index) =>  payload.removedSongs.includes(index) )
        }
        // Update count in current playlist
        return {
            ...state,
            byId: {
                ...state.byId,
                [payload.playlist.id] : {
                    ...payload.playlist,
                    songCount : payload.playlist.songCount - payload.removedSongs.length,
                    duration : payload.playlist.duration - deletedSongs.reduce( (a,b) => ({duration: a.duration+b.duration}), {duration:0} ).duration
                }
            },
            currentPlaylist : {
                ...state.currentPlaylist,
                songs : currentSongs
            }
        }
    },
    [types.DELETE_PLAYLIST_RESULT]: (state, payload) => {
        let playlistsWithoutDeleted = {...state.byId}
        delete playlistsWithoutDeleted[payload.playlist.id]
        return {
            ...state,
            byId: playlistsWithoutDeleted
        }
    },
    [types.EDIT_PLAYLIST_RESULT]: (state, payload) => {
        // Look for this playlist in the state and check if something changed
        const currentPlaylist = state.byId[payload.id]
        if( currentPlaylist.name !== payload.name ||
            currentPlaylist.comment !== payload.comment ||
            currentPlaylist.public !== payload.public ) {
            // Edit the values
            const newPlaylist = { ...currentPlaylist, name: payload.name,comment: payload.comment,public: payload.public }
            return {
                ...state,
                byId: {
                    ...state.byId,
                    [payload.id] : newPlaylist
                }
            }
        }
        return state
    },
    [types.LOAD_SINGLE_PLAYLIST_SUCCESS]: (state, payload) => {
        return {
            ...state,
            currentPlaylist : {
                id : payload.id,
                songs : payload.songs
            }
        }
    },
    [types.LOAD_SINGLE_PLAYLIST_REQUEST]: (state, payload) => {
        return {
            ...state,
            currentPlaylist : {
                id : payload.id,
                songs : []
            }
        }
    },
    [types.LOGOUT_USER]: (state, payload) => initialState.playlists
})