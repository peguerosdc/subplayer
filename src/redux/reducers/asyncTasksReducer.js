
import * as types from "../actions/actionTypes"
import initialState from "./initialState"
import {createReducer} from '../../utils/redux.js'

export default createReducer(initialState.asyncTasksInProgress, {
    [types.BEGIN_ASYNC_OPERATION]: (state, payload) => state + 1,
    [types.END_ASYNC_OPERATION]: (state, payload) => state - 1
})