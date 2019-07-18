import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default (state = initialState.artistContent, action) => {
    switch (action.type) {
        case types.STARTED_LOADING_ARTIST:
            return Object.assign({}, state, {
                currentArtist : Array.prototype.concat.apply([], state.artists.map(index => index.artist)).find(a => a.id === action.id)
            })
        case types.LOAD_ARTISTS_SUCCESS:
            return Object.assign({}, state, {
                artists : action.artists
            })
        case types.LOAD_ARTIST_SUCCESS:
            return Object.assign({}, state, {
                currentArtist : action.artist
            })
        default:
            return state;
    }
}