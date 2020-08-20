import * as types from "../actions/actionTypes"
import initialState from "./initialState"
import {createReducer, get_normalized_songs, set_starred_song_on_state, get_shuffled_songs, get_ordered_songs} from '../../utils/redux.js'

export default createReducer(initialState.musicPlayer, {
    [types.TOGGLE_SHUFFLE_ON]: (state, payload) => {
        // shuffle the original list of songs and keep the current song playing
        const newList = get_shuffled_songs(state.songsById[state.currentSongId], state.original.map(id => state.songsById[id]))
        return {
            ...state,
            currentSongIndex : 0,
            isShuffleOn: true,
            queue: newList
        }
    },
    [types.TOGGLE_SHUFFLE_OFF]: (state, payload) => {
        // recover the original order, but start from the song currently playing
        const newList = get_ordered_songs(state.songsById[state.currentSongId], state.original.map(id => state.songsById[id]))
        return {
            ...state,
            currentSongIndex : 0,
            isShuffleOn: false,
            queue: newList
        }
    },
    [types.SEEK_TO_SONG_IN_QUEUE]: (state, payload) => {
        // Look for the index of this song in the queue
        const newIndex = state.queue.indexOf(payload.song.id)
        return {
            ...state,
            currentSongIndex : newIndex !== -1 ? newIndex : state.currentSongIndex,
            currentSongId : newIndex !== -1 ? payload.song.id : state.currentSongId,
        }
    },
    [types.ADD_SONGS_TO_QUEUE]: (state, payload) => {
        // map the songs to just their ids to add them to the queues
        const newSongsIds = payload.songs.map(song => song.id)
        const newQueue = [...state.queue, ...newSongsIds]
        const newOriginal = [...state.original, ...newSongsIds]
        return {
            ...state,
            /* Songs should start playing if the queue was empty, so the index should be set to 0.
             * If a song was already playing, it should remain playing */
            currentSongIndex : state.currentSongIndex || 0,
            queue : newQueue,
            original : newOriginal,
            songsById : {...state.songsById, ...get_normalized_songs(payload.songs) }
        }
    },
    [types.REMOVE_SONGS_FROM_QUEUE]: (state, payload) => {
        // Remove all the songs in the payload from the queue and the original list
        const idsForDeletion = payload.songs.map(song => song.id)
        const newQueue = state.queue.filter(songId => !idsForDeletion.includes(songId))
        const newOriginal = state.original.filter(songId => !idsForDeletion.includes(songId))
        // If the song currently playing is removed, check that the queue is not empty
        const currentlyPlayingId = state.queue[state.currentSongIndex]
        if( idsForDeletion.includes(currentlyPlayingId) ) {
            // Only play the next one if there are songs remaining in the queue
            const hasSongsLeft = (state.currentSongIndex != null) && (state.currentSongIndex < newQueue.length)
            if( !hasSongsLeft ) {
                return initialState.musicPlayer
            }
        }
        // Create new db of the songs that survived
        const newSongsById = Object.assign({}, state.songsById)
        idsForDeletion.forEach(id => {delete newSongsById[id]} )
        // Return the final state
        return {
            ...state,
            queue : newQueue,
            original : newOriginal,
            songsById : newSongsById
        }
    },
    [types.PUT_SONGS_IN_QUEUE]: (state, payload) => {
        // Replace the songs in the queue with the proper setting
        let newList = []
        if( state.isShuffleOn ) {
            newList = get_shuffled_songs(payload.songToPlay, payload.songs)
        }
        else {
            newList = get_ordered_songs(payload.songToPlay, payload.songs)
        }
        return {
            ...state,
            currentSongId: newList[0],
            currentSongIndex : 0,
            queue : newList,
            original : payload.songs.map(song => song.id),
            songsById : get_normalized_songs(payload.songs)
        }
    },
    [types.CLEAR_QUEUE]: (state, payload) => initialState.musicPlayer,
    [types.PLAY_NEXT_SONG]: (state, payload) => {
        const hasNext = (state.currentSongIndex != null) && (state.currentSongIndex + 1 < state.queue.length)
        // When the existing queue has finished playing, clear it
        const nextIndex = state.currentSongIndex + 1
        return hasNext ? {
            ...state,
            currentSongIndex : nextIndex,
            currentSongId: state.queue[nextIndex]
        } : initialState.musicPlayer
    },
    [types.PLAY_PREVIOUS_SONG]: (state, payload) => {
        const hasPrevious = state.currentSongIndex > 0
        // When the existing queue has finished playing, clear it
        const prevIndex = state.currentSongIndex - 1
        return hasPrevious ? {
            ...state,
            currentSongIndex : prevIndex,
            currentSongId: state.queue[prevIndex]
        } : initialState.musicPlayer
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