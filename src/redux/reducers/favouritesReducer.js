import * as types from "../actions/actionTypes";
import initialState from "./initialState";
import {createReducer} from '../../utils/redux.js';

export default createReducer(initialState.favourites, {
    [types.LOAD_FAVOURITES_RESULT] : (state, payload) => payload.songs.map(song => song.id),
    [types.STAR_SONG_RESULT] : (state, payload) => {
        let newSongs = null
        // Concatenate the faved songs (in a new array) if a new song was added
        if( payload.starred ) {
            newSongs = state.concat( payload.songIds )
        }
        // Or create a new array without the deleted songs as the songs' array
        else {
            newSongs = state.filter(s => !payload.songIds.includes(s));
        }
        return newSongs
    },
    [types.LOGOUT_USER]: (state, payload) => initialState.favourites
})