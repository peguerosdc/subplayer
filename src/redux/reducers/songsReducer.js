import * as types from "../actions/actionTypes";
import initialState from "./initialState";
import {createReducer} from '../../utils/redux.js';

export default createReducer(initialState.songs, {
    [types.ADD_SONGS_TO_QUEUE]: (state, payload) => {
        return {
            ...state,
            currentIndex : 0,
            current : payload.songs[0],
            queue : payload.songs
        }
    },
    [types.PLAY_NEXT_SONG]: (state, payload) => {
        const hasNext = (state.currentIndex != null) && (state.currentIndex + 1 < state.queue.length)
        return Object.assign({}, state,
            hasNext ? {
                currentIndex : state.currentIndex + 1,
                current : state.queue[state.currentIndex + 1]
            }
            : { currentIndex : null, current : null })
    },
    [types.PLAY_PREVIOUS_SONG]: (state, payload) => {
        const hasPrevious = state.currentIndex > 0
        return Object.assign({}, state,
            hasPrevious ? {
                currentIndex : state.currentIndex-1,
                current : state.queue[state.currentIndex-1]
            } 
            : {})
    },
    [types.STAR_SONG_RESULT] : (state, payload) => {
        let newState = state
        // We are relying on the current song being edited
        if(state.current.id === payload.songId) {
            const newSong = { ...state.current, starred : new Date().toISOString() }
            const newQueue = state.queue.slice(0, state.currentIndex).concat( [newSong], state.queue.slice(state.currentIndex+1))
            newState = {
                ...state,
                current : newSong,
                queue : newQueue
            }
        }
        return newState
    },
    [types.LOGOUT_USER]: (state, payload) => initialState.songs
})