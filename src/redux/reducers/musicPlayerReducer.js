import * as types from "../actions/actionTypes"
import initialState from "./initialState"
import {createReducer, get_normalized_songs, set_starred_song_on_state} from '../../utils/redux.js'

function hasNextSongToPlay(currentSongIndex, queue) {
    return (currentSongIndex != null) && (currentSongIndex + 1 < queue.length)
}

export default createReducer(initialState.musicPlayer, {
    [types.ADD_SONGS_TO_QUEUE]: (state, payload) => {
        const newQueue = [...state.queue, ...payload.songs.map(song => song.id)]
        return {
            ...state,
            /* Songs should start playing if the queue was empty, so the index should be set to 0.
             * If a song was already playing, it should remain playing */
            currentSongIndex : state.currentSongIndex || 0,
            queue : newQueue,
            songsById : {...state.songsById, ...get_normalized_songs(payload.songs) }
        }
    },
    [types.REMOVE_SONGS_FROM_QUEUE]: (state, payload) => {
        // Remove all the songs in the payload from the queue
        const idsForDeletion = payload.songs.map(song => song.id)
        const newQueue = state.queue.filter(songId => !idsForDeletion.includes(songId))
        // If the song currently playing is removed, play the next one
        let currentSongIndex = state.currentSongIndex
        const currentlyPlayingId = state.queue[currentSongIndex]
        if( idsForDeletion.includes(currentlyPlayingId) ) {
            // Only play the next one if there are songs remaining in the queue
            const hasNext = hasNextSongToPlay(state.currentSongIndex, newQueue)
            if( hasNext ) {
                currentSongIndex = state.currentSongIndex + 1
            }
            // When there are no songs remaining to be played, just clear the queue
            else {
                return initialState.musicPlayer
            }
        }
        // Create new db of the songs that survived
        const newSongsById = Object.assign({}, state.songsById)
        idsForDeletion.forEach(id => {delete newSongsById[id]} )
        // Return the final state
        return {
            ...state,
            currentSongIndex : currentSongIndex,
            queue : newQueue,
            songsById : newSongsById
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
    [types.CLEAR_QUEUE]: (state, payload) => initialState.musicPlayer,
    [types.PLAY_NEXT_SONG]: (state, payload) => {
        const hasNext = hasNextSongToPlay(state.currentSongIndex, state.queue)
        // When the existing queue has finished playing, clear it
        return hasNext ? {...state, currentSongIndex : state.currentSongIndex + 1} : initialState.musicPlayer
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