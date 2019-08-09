import authReducer from "../authReducer"
import * as actions from "../../actions/authActions"

describe('async tasks reducer', () => {

    it('should return the initial state', () => {
        // Define initial state
        const initialState = { isAuthenticated: false, isAuthenticating: true, statusText: null }
        // Expect it to return when no specific action is triggered
        expect( authReducer(initialState, {}) ).toEqual(initialState)
    })

    it('should set status as authentication in progress', () => {
        const initialState = { isAuthenticated: false, isAuthenticating: true, statusText: null }
        expect( authReducer(initialState, actions.loginUserRequest() ) ).toEqual({
            isAuthenticated : false,
            isAuthenticating : true,
            statusText : null
        })
    })

    it('should set status as authentication was successful', () => {
        const initialState = { isAuthenticated: false, isAuthenticating: true, statusText: null }
        expect(
            authReducer(initialState, actions.loginUserSuccess("host", "username", "enc:pass") )
        ).toMatchObject({
            isAuthenticated : true,
            isAuthenticating : false,
        })
    })

    it('should set status as authentication was unsuccessful with an error to display', () => {
        const initialState = { isAuthenticated: false, isAuthenticating: true, statusText: null }
        const newState = authReducer(initialState, actions.loginUserFailure(new Error('ERROR')))
        expect( newState.isAuthenticated ).toEqual(false)
        expect( newState.isAuthenticating ).toEqual(false)
        expect( newState.statusText ).toEqual('ERROR')
    })

    it('should clear auth details on logout', () => {
        const initialState = { isAuthenticated: true, isAuthenticating: true, statusText: null }
        const newState = authReducer(initialState, actions.logout() )
        expect( newState.isAuthenticated ).toEqual(false)
    })

    it('should set authenticated as false when lazy login failed', () => {
        const initialState = { isAuthenticated: true, isAuthenticating: true, statusText: null }
        const newState = authReducer(initialState, actions.lazyLoginUser() )
        expect( newState.isAuthenticating ).toEqual(false)
    })

})