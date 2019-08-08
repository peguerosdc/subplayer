// Mocking redux
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'
// Own imports to test
import * as actions from './searchActions'
import * as types from './actionTypes'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('search actions', () => {

    afterEach(() => {
        fetchMock.restore()
    })

    it('creates a SEARCH_RESULT when successfully performing a search', () => {
        fetchMock.getOnce('*', {
            body: {"subsonic-response": { "status" : "ok", "searchResult3" : {} }, "status": "ok","version": "1.9.0"},
            headers: { 'content-type': 'application/json' }
        })

        const expectedActions = [
            { type: types.BEGIN_ASYNC_OPERATION },
            { type: types.SEARCH_RESULT, payload : {} },
            { type: types.END_ASYNC_OPERATION }
        ]
        
        const store = mockStore({})
        return store.dispatch(actions.search("query")).then(() => {
            // return of async actions
            expect(store.getActions()).toMatchObject(expectedActions)
        })
    })

    it('creates an ERROR alert when failing to search', () => {
        fetchMock.getOnce('*', 500)

        const expectedActions = [
            { type: types.BEGIN_ASYNC_OPERATION },
            { type: types.END_ASYNC_OPERATION, alert : { type : 'ALERT_TYPE_ERROR' } }
        ]
        
        const store = mockStore({})
        return store.dispatch(actions.search("query")).then(() => {
            // return of async actions
            expect(store.getActions()).toMatchObject(expectedActions)
        })
    })

})