
import initialState from "./initialState";

function build_last_operation_result(type, message) {
    return {id: Date.now(), type:type, message:message}
}

export default (state = initialState.alert, action) => {
    if( action.alert && action.alert.type && action.alert.message ) {
        return build_last_operation_result(action.alert.type, action.alert.message)
    }
    return state
}