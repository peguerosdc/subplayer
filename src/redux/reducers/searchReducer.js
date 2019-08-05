import * as types from "../actions/actionTypes"
import initialState from "./initialState"
import {createReducer} from '../../utils/redux.js'

export default createReducer(initialState.search, {
    [types.SEARCH_RESULT]: (state, payload) => {
        return {
            'albums': payload.album,
            'artists': payload.artist,
            'songs': payload.song
        }
    },
    [types.LOGOUT_USER]: (state, payload) => {
        return initialState.search
    }
})