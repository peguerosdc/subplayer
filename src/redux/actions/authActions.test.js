// Mocking redux
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'
// Own imports to test
import * as actions from './authActions'
import * as types from './actionTypes'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('authentication actions', () => {

    afterEach(() => {
        fetchMock.restore()
    })

    it('creates a LOGIN_USER_SUCCESS when successfully logs in a user', () => {
        fetchMock.getOnce('*', {
            body: {"subsonic-response": { "status" : "ok" }, "status": "ok","version": "1.9.0"},
            headers: { 'content-type': 'application/json' }
        })

        const expectedActions = [
            { type: types.LOGIN_USER_REQUEST },
            { type: types.LOGIN_USER_SUCCESS }
        ]
        
        const store = mockStore({})
        return store.dispatch(actions.loginUser("host", "user", "pass")).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
        })
    })

    it('creates a LOGIN_USER_FAILURE when failing to log in a user with invalid credentials', () => {
        const error_message = "Invalid Credentials"
        fetchMock.getOnce('*', {
            body: {"subsonic-response": { "error" : { message : error_message } }, "status": "failed","version": "1.9.0"},
            headers: { 'content-type': 'application/json' }
        })

        const expectedActions = [
            { type: types.LOGIN_USER_REQUEST },
            { type: types.LOGIN_USER_FAILURE, payload : { statusText : error_message } }
        ]
        
        const store = mockStore({})
        return store.dispatch(actions.loginUser("host", "user", "pass")).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
        })
    })

    it('creates a LOGIN_USER_FAILURE when failing to log in a user by any reason', () => {
        fetchMock.getOnce('*', 500)
        
        const store = mockStore({})
        return store.dispatch(actions.loginUser("host", "user", "pass")).then(() => {
            // return of async actions
            const actions = store.getActions()
            expect( actions[0] ).toEqual({ type: types.LOGIN_USER_REQUEST })
            expect( actions[1] ).toMatchObject({ type: types.LOGIN_USER_FAILURE, payload : { statusText : expect.anything() } })
        })
    })

    it('creates a LAZY_LOGIN_IGNORE when no cached credentials are found', () => {        
        expect(actions.lazyLoginUser()).toEqual({ type: types.LAZY_LOGIN_IGNORE })
    })

    it('creates a LOGOUT_USER when logging out a user', () => {        
        expect(actions.logout()).toEqual({ type: types.LOGOUT_USER })
    })


})