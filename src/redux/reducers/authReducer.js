import * as types from "../actions/actionTypes"
import initialState from "./initialState"
import {createReducer} from '../../utils/redux.js';

export default createReducer(initialState.auth, {
    [types.LOGIN_USER_REQUEST]: (state, payload) => {
        return Object.assign({}, state, {
            'isAuthenticating': true,
            'statusText': null
        })
    },
    [types.LOGIN_USER_SUCCESS]: (state, payload) => {
        return Object.assign({}, state, {
            'isAuthenticating': false,
            'isAuthenticated': true,
            'statusText': 'You have been successfully logged in.'
        })

    },
    [types.LOGIN_USER_FAILURE]: (state, payload) => {
        return Object.assign({}, state, {
            'isAuthenticating': false,
            'isAuthenticated': false,
            'statusText': payload.statusText
        })
    },
    [types.LOGOUT_USER]: (state, payload) => {
        return Object.assign({}, state, {
            'isAuthenticated': false,
            'statusText': 'You have been successfully logged out.'
        })
    },
    [types.LAZY_LOGIN_IGNORE]: (state, payload) => {
        return Object.assign({}, state, {
            'isAuthenticating': false,
        })
    }
})