
export const ALERT_TYPE_SUCCESS = "ALERT_TYPE_SUCCESS"
export const ALERT_TYPE_WARNING = "ALERT_TYPE_WARNING"
export const ALERT_TYPE_ERROR = "ALERT_TYPE_ERROR"

/* Functions NOT meant to dispatch actions, only to build the alerts */
export function alertSuccessObject(message) {
  return { alert: { type: ALERT_TYPE_SUCCESS, message: message } }
}

export function alertWarningObject(message) {
  return { alert: { type: ALERT_TYPE_WARNING, message : message } }
}

export function alertErrorObject(message) {
  return { alert: { type: ALERT_TYPE_ERROR, message : message } }
}
