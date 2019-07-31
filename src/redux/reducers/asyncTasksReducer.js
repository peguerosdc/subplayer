
import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function asyncTasksReducer(state = initialState.asyncTasksInProgress, action) {
    switch(action.type) {
        case types.BEGIN_ASYNC_OPERATION:
            return state + 1
        case types.END_ASYNC_OPERATION:
            return state - 1
        default:
            return state
    }
}