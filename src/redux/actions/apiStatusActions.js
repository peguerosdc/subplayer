import * as types from "./actionTypes"

export function beginApiCall() {
  return { type: types.BEGIN_API_CALL }
}

export function apiCallSuccess(message) {
  return { type: types.END_API_CALL_SUCCESS, message }
}

export function apiCallWarning(message) {
  return { type: types.END_API_CALL_WARNING, message : message }
}

export function apiCallError(message) {
  return { type: types.END_API_CALL_ERROR, message : message }
}