import * as types from "../actions/actionTypes";
import initialState from "./initialState";
import {createReducer} from '../../utils/redux.js';

export default createReducer(initialState.songs, {
    [types.ADD_SONGS_TO_QUEUE]: (state, payload) => {
        return {
            ...state,
            currentSongIndex : 0,
            currentSongPlaying : payload.songs[0],
            queue : payload.songs
        }
    },
    [types.PLAY_NEXT_SONG]: (state, payload) => {
        const hasNext = (state.currentSongIndex != null) && (state.currentSongIndex + 1 < state.queue.length)
        return Object.assign({}, state,
            hasNext ? {
                currentSongIndex : state.currentSongIndex + 1,
                currentSongPlaying : state.queue[state.currentSongIndex + 1]
            }
            : { currentSongIndex : null, currentSongPlaying : null })
    },
    [types.PLAY_PREVIOUS_SONG]: (state, payload) => {
        const hasPrevious = state.currentSongIndex > 0
        return Object.assign({}, state,
            hasPrevious ? {
                currentSongIndex : state.currentSongIndex-1,
                currentSongPlaying : state.queue[state.currentSongIndex-1]
            } 
            : {})
    },
    [types.STAR_SONG_RESULT] : (state, payload) => {
        let newState = state
        const currentSongPlaying = state.currentSongPlaying
        // We are relying on the current song being edited
        if( currentSongPlaying ) {
            payload.songIds.forEach( (starredSongId, index) => {
                if(currentSongPlaying.id === starredSongId) {
                    const star = payload.starred ? new Date().toISOString() : false
                    const newSong = { ...state.currentSongPlaying, starred : star }
                    const newQueue = state.queue.slice(0, state.currentSongIndex).concat( [newSong], state.queue.slice(state.currentSongIndex+1))
                    newState = {
                        ...state,
                        currentSongPlaying : newSong,
                        queue : newQueue
                    }
                }
            })
        }
        return newState
    },
    [types.PUT_SONGS_RESULT] : (state, payload) => {
        // Transform the array of songs coming in the payload to a normalized object
        let normalized_songs = payload.songs.reduce( (current,song) => ({...current, [song.id] : song }), {} )
        // Replace the current songs if "clearCurrentList" or append the new songs to
        // the existing list
        const newSongs = payload.clearCurrentList
            ? normalized_songs
            : {...state.byId, ...normalized_songs}
        return { ...state, byId : newSongs }
    },
    [types.LOGOUT_USER]: (state, payload) => initialState.songs
})