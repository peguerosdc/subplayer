import * as types from "../actions/actionTypes"
import initialState from "./initialState"
import {createReducer, get_normalized_songs, set_starred_song_on_state} from '../../utils/redux.js'

export default createReducer(initialState.musicPlayer, {
    [types.ADD_SONGS_TO_QUEUE]: (state, payload) => {
        const newQueue = [...state.queue, ...payload.songs.map(song => song.id)]
        return {
            ...state,
            queue : newQueue,
            songsById : {...state.songsById, ...get_normalized_songs(payload.songs) }
        }
    },
    [types.PUT_SONGS_IN_QUEUE]: (state, payload) => {
        return {
            ...state,
            currentSongIndex : 0,
            queue : payload.songs.map(song => song.id),
            songsById : get_normalized_songs(payload.songs)
        }
    },
    [types.PLAY_NEXT_SONG]: (state, payload) => {
        const hasNext = (state.currentSongIndex != null) && (state.currentSongIndex + 1 < state.queue.length)
        return {
            ...state,
            currentSongIndex : hasNext ? state.currentSongIndex + 1 : null
        }
    },
    [types.PLAY_PREVIOUS_SONG]: (state, payload) => {
        const hasPrevious = state.currentSongIndex > 0
        return {
            ...state,
            currentSongIndex : hasPrevious ? state.currentSongIndex - 1 : null
        }
    },
    [types.STAR_SONG_RESULT] : (state, payload) => {
        let newState = state
        // Toggle if it is found in the DB of songs
        payload.songIds.forEach( (id) => {
            newState = set_starred_song_on_state(newState, 'songsById', id, payload.starred)
        })
        return newState
    },
    [types.LOGOUT_USER]: (state, payload) => initialState.musicPlayer
})