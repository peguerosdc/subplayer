import * as types from "../actions/actionTypes"
import {isPlaylistMineByOwner} from "../../utils/utils"
import initialState from "./initialState"
import {createReducer} from '../../utils/redux.js'

export default createReducer(initialState.playlists, {
    [types.LOAD_PLAYLISTS_SUCCESS]: (state, payload) => {
        // Join playlists in a new object to avoid modifying the state
        var playlists = {}
        for (var i = 0; i < payload.playlists.length; i++) {
            var p = payload.playlists[i]
            p = {...p, ...state.byId[p.id]}
            // Append a boolean to know if the playlist is mine
            p.isMine = isPlaylistMineByOwner(p.owner)
            // Fill array of songs empty if not present
            if( !p.songs ) {
                p.songs = []
            }
            playlists[p.id] = p
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
        // When updating the state, there is no necessity to update the "songs" array
        // as it will get re-populated when the playlist's page is opened, but still 
        // let's do it just in case it is needed in the future
        return {
            ...state,
            byId: {
                ...state.byId,
                [payload.playlist.id] : {
                    ...payload.playlist,
                    songCount : payload.playlist.songCount + songsAdded.length,
                    duration: payload.playlist.duration + payload.songsAdded.reduce( (a,b) => ({duration: a.duration+b.duration}), {duration:0} ).duration,
                    songs : state.byId[payload.playlist.id].songs.concat(songsAdded.map(song => song.id))
                }
            }
        }
    },
    [types.REMOVE_SONGS_FROM_PLAYLIST_RESULT]: (state, payload) => {
        // Update count in current playlist. When updating the state, in here it is
        // necessary to remove the song from the list as songs are only removed when
        // the playlist's page is loaded and the UI needs to be refreshed
        return {
            ...state,
            byId: {
                ...state.byId,
                [payload.playlist.id] : {
                    ...payload.playlist,
                    songCount : payload.playlist.songCount - payload.removedSongsIndexes.length,
                    duration : payload.playlist.duration - payload.removedSongs.reduce( (a,b) => ({duration: a.duration+b.duration}), {duration:0} ).duration,
                    songs : payload.playlist.songs.filter((song, index) => !payload.removedSongsIndexes.includes(index) )
                }
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
        const {entry, ...playlist} = payload.playlist
        return {
            ...state,
            byId : {
                ...state.byId,
                [playlist.id] : {
                    ...state.byId[playlist.id],
                    ...playlist,
                    songs : entry.map(song => song.id)
                }
            }
        }
    },
    [types.LOGOUT_USER]: (state, payload) => initialState.playlists
})