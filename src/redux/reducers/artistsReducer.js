import * as types from "../actions/actionTypes";
import initialState from "./initialState";
import {createReducer} from '../../utils/redux.js';

export default createReducer(initialState.artists, {
    [types.LOAD_ARTISTS_INDEX_SUCCESS]: (state, payload) => {
        return {
            ...state,
            byIndex : payload.artistsIndex
        }
    },
    [types.LOAD_ONE_ARTIST_SUCCESS]: (state, payload) => {
        // Normalize the albums of the artist to just contain the IDs
        const normalized_albums = payload.artist.album.map(album => album.id)
        return {
            ...state,
            byId : {
                [payload.artist.id] : {
                    ...payload.artist,
                    album : normalized_albums
                }
            }
        }
    },
    [types.LOGOUT_USER]: (state, payload) => initialState.artists,
})