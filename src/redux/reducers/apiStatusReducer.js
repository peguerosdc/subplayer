
import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export const SUCCESS = 1
export const WARNING = 2
export const ERROR = 3

function build_last_operation_result(type, message) {
    return {id: Date.now(), type:type, message:message}
}

export default function apiCallStatusReducer(state = initialState.apiCallsInProgress, action) {
    let lastOperationResult = null
    switch(action.type) {
        case types.BEGIN_API_CALL:
            return {...state, count : state.count + 1}
        case types.END_API_CALL_SUCCESS:
            lastOperationResult = action.message
                ? build_last_operation_result(SUCCESS, action.message)
                : state.lastOperationResult
            return {
                lastOperationResult : lastOperationResult,
                count : state.count - 1,
            }
        case types.END_API_CALL_WARNING:
            lastOperationResult = action.message
                ? build_last_operation_result(WARNING, action.message)
                : state.lastOperationResult
            return {
                lastOperationResult : lastOperationResult,
                count : state.count - 1,
            }
        case types.END_API_CALL_ERROR:
            lastOperationResult = action.message
                ? build_last_operation_result(ERROR, action.message)
                : state.lastOperationResult
            return {
                lastOperationResult : lastOperationResult,
                count : state.count - 1,
            }
        default:
            return state
    }
}