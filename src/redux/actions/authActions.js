import * as types from "./actionTypes"
import subsonic from "../../api/subsonicApi"

export function loginUserRequest() {
    return { type: types.LOGIN_USER_REQUEST }
}

export function loginUserSuccess(host, username, enc) {
    localStorage.setItem('host', host)
    localStorage.setItem('username', username)
    localStorage.setItem('enc', enc)
    // Update subsonic API
    subsonic.setConfig(host, username, enc, false)
    // Log in
    return {
        type: types.LOGIN_USER_SUCCESS,
    }
}

export function loginUserFailure(error) {
    localStorage.removeItem('host')
    localStorage.removeItem('username')
    localStorage.removeItem('enc')
    return {
        type: types.LOGIN_USER_FAILURE,
        payload: {
            statusText: error.message
        }
    }
}

export function loginUser(host, username, password, encodePassword = true) {
    return async (dispatch) => {
        dispatch(loginUserRequest())
        // Perform login
        try {
            const success = await subsonic.login(host, username, password, encodePassword)
            if( success ) {
                const passwordToStore = encodePassword ? subsonic.getEncodedPassword(password) : password
                dispatch(loginUserSuccess(host, username, passwordToStore))
            }
            else {
                dispatch(loginUserFailure({statusText:"Authentication failed"}))
            }
        }
        catch(err) {
            console.error(err)
            dispatch(loginUserFailure(err))
        }
        
    }
}

export function lazyLoginUser() {
    // Check if we have credentials stored and try to log in existing user
    const host = localStorage.getItem('host')
    const username = localStorage.getItem('username')
    const enc = localStorage.getItem('enc')
    if( host && username && enc ) {
        return loginUser(host, username, enc, false)
    }
    return {type: types.LAZY_LOGIN_IGNORE}
}

export function logout() {
    localStorage.removeItem('host')
    localStorage.removeItem('username')
    localStorage.removeItem('enc')
    return { type: types.LOGOUT_USER }
}