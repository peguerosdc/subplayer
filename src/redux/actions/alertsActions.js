
export const ALERT_TYPE_SUCCESS = "ALERT_TYPE_SUCCESS"
export const ALERT_TYPE_WARNING = "ALERT_TYPE_WARNING"
export const ALERT_TYPE_ERROR = "ALERT_TYPE_ERROR"

export function alertSuccess(message) {
  return { alert: { type: ALERT_TYPE_SUCCESS, message: message } }
}

export function alertWarning(message) {
  return { alert: { type: ALERT_TYPE_WARNING, message : message } }
}

export function alertError(message) {
  return { alert: { type: ALERT_TYPE_ERROR, message : message } }
}