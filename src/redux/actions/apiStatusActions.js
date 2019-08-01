import * as types from "./actionTypes"
import * as alerts from "./alertsActions"

export function beginAsyncTask() {
  return { type: types.BEGIN_ASYNC_OPERATION }
}

export function asyncTaskSuccess(message) {
  return message ?  { type: types.END_ASYNC_OPERATION, ...alerts.alertSuccessObject(message) } : { type: types.END_ASYNC_OPERATION }
}

export function asyncTaskWarning(message) {
  return message ?  { type: types.END_ASYNC_OPERATION, ...alerts.alertWarningObject(message) } : { type: types.END_ASYNC_OPERATION }
}

export function asyncTaskError(message) {
  return message ?  { type: types.END_ASYNC_OPERATION, ...alerts.alertErrorObject(message) } : { type: types.END_ASYNC_OPERATION }
}
