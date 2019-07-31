import * as types from "./actionTypes"
import * as alerts from "./alertsActions"

export function beginAsyncTask() {
  return { type: types.BEGIN_ASYNC_OPERATION }
}

export function asyncTaskSuccess(message) {
  return message ?  { type: types.END_ASYNC_OPERATION, ...alerts.alertSuccess(message) } : { type: types.END_ASYNC_OPERATION }
}

export function asyncTaskWarning(message) {
  return message ?  { type: types.END_ASYNC_OPERATION, ...alerts.alertWarning(message) } : { type: types.END_ASYNC_OPERATION }
}

export function asyncTaskError(message) {
  return message ?  { type: types.END_ASYNC_OPERATION, ...alerts.alertError(message) } : { type: types.END_ASYNC_OPERATION }
}
