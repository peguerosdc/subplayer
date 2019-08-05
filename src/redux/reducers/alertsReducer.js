
import initialState from "./initialState"

function build_last_operation_result(type, message) {
    return { id: Date.now(), type:type, message:message }
}

function does_action_contain_alert(action) {
    return action.alert && action.alert.type && action.alert.message
}

/*
 * Usually, actions are dispatched with three keys:
 * type, payload, alert
 * Function "createReducer" in utils/redux.js just takes the "payload" object and passes it to the
 * body of the reducer to map it to its appropiate function.
 * This reducer doesnt use "createReducer" because it doesn't care about the type
 * of the action, it just looks for the "alert" key and if it is present, then that means
 * the action meant to display an alert notification and it is displayed.
 */
export default (state = initialState.alert, action) => {
    // Check if a valid "alert" object is found in this action
    return does_action_contain_alert(action)
        ? build_last_operation_result(action.alert.type, action.alert.message)
        : state
}