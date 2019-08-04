import * as types from "../actions/actionTypes";
import initialState from "./initialState";
import {createReducer} from '../../utils/redux.js';

function get_normalized_songs(songs) {
    // Transform the array of songs coming in the payload to a normalized object
    return songs.reduce( (current,song) => ({...current, [song.id] : song }), {} )
}

export default createReducer(initialState.musicPlayer, {
    [types.ADD_SONGS_TO_QUEUE]: (state, payload) => {
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
            if( newState.songsById[id] ) {
                newState = {
                    ...newState,
                    songsById : {
                        ...newState.songsById,
                        [id] : {
                            ...newState.songsById[id],
                            starred : payload.starred
                        }
                    }
                }
            }
        })
        return newState
    },
    [types.LOGOUT_USER]: (state, payload) => initialState.musicPlayer
})