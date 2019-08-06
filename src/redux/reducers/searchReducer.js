import * as types from "../actions/actionTypes"
import initialState from "./initialState"
import {createReducer, get_normalized_songs} from '../../utils/redux.js'

export default createReducer(initialState.search, {
    [types.SEARCH_RESULT]: (state, payload) => {
        return {
            'albums': payload.album,
            'artists': payload.artist,
            'songs': payload.song ? payload.song.map(song => song.id) : [],
            'songsById' : get_normalized_songs(payload.song)
        }
    },
    [types.STAR_SONG_RESULT] : (state, payload) => {
        let newState = state
        // Toggle if it is found in the DB of songs
        const modifiedSongsInDB = payload.songIds.filter(id => state.songsById[id])
        modifiedSongsInDB.forEach( (id) => {
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
        })
        return newState
    },
    [types.LOGOUT_USER]: (state, payload) => {
        return initialState.search
    }
})