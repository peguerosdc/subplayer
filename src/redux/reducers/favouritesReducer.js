import * as types from "../actions/actionTypes";
import initialState from "./initialState";
import {createReducer} from '../../utils/redux.js';

export default createReducer(initialState.favourites, {
    [types.LOAD_FAVOURITES_RESULT] : (state, payload) => {
        return { ...state, songs : payload.songs }
    },
    [types.STAR_SONG_RESULT] : (state, payload) => {
        let newSongs = null
        // Concatenate the faved songs (in a new array) if a new song was added
        if( payload.starred ) {
            newSongs = state.songs.concat( payload.songIds )
        }
        // Or create a new array without the deleted songs as the songs' array
        else {
            newSongs = state.songs.filter(s => !payload.songIds.includes(s));
        }
        return { ...state, songs : newSongs }
    },
    [types.LOGOUT_USER]: (state, payload) => initialState.favourites
})