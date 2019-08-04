import * as types from "../actions/actionTypes";
import initialState from "./initialState";
import {createReducer} from '../../utils/redux.js';

function put_songs_in_store(state, songs, clearCurrentList = true) {
    // Transform the array of songs coming in the payload to a normalized object
    let normalized_songs = songs.reduce( (current,song) => ({...current, [song.id] : song }), {} )
    // Replace the current songs if "clearCurrentList" or append the new songs to
    // the existing list
    const newSongs = clearCurrentList
        ? normalized_songs
        : {...state.byId, ...normalized_songs}
    return { ...state, byId : newSongs }
}

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
        // Toggle if it is found in the DB of songs
        const modifiedSongsInDB = payload.songIds.filter(id => state.byId[id])
        modifiedSongsInDB.forEach( (id) => {
            newState = {
                ...newState,
                byId : {
                    ...newState.byId,
                    [id] : {
                        ...newState.byId[id],
                        starred : payload.starred
                    }
                }
            }
        })
        return newState
    },
    [types.PUT_SONGS_RESULT] : (state, payload) => put_songs_in_store(state, payload.songs, payload.clearCurrentList),
    [types.LOAD_ONE_ARTIST_SUCCESS] : (state, payload) => put_songs_in_store(state, payload.songs, true),
    [types.LOAD_ALBUM_SUCCESS] : (state, payload) => put_songs_in_store(state, payload.album.song, true),
    [types.LOGOUT_USER]: (state, payload) => initialState.songs
})