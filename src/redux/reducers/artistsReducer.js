import * as types from "../actions/actionTypes";
import initialState from "./initialState";
import {createReducer} from '../../utils/redux.js';

export default createReducer(initialState.artists, {
    [types.LOAD_ARTISTS_SUCCESS]: (state, payload) => payload.artists,
    [types.LOGOUT_USER]: (state, payload) => initialState.artists
})