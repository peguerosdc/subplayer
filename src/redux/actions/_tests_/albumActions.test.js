// Mocking redux
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'
// Own imports to test
import * as actions from '../albumActions'
import * as types from '../actionTypes'
import * as alerts from "../alertsActions"

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('album actions', () => {

    afterEach(() => {
        fetchMock.restore()
    })

    it('creates LOAD_ALBUM_SUCCESS when fetching one album', () => {
        // Fetch one album's response
        const mockResponse = {"subsonic-response": {"album": {"id": "id","song": [{"id" : "s1"},{"id" : "s2"}],"songCount": 2},"status": "ok","version": "1.9.0"}}
        fetchMock.getOnce('*', {
            body: mockResponse,
            headers: { 'content-type': 'application/json' }
        })

        const expectedActions = [
            { type: types.BEGIN_ASYNC_OPERATION },
            { type: types.LOAD_ALBUM_SUCCESS, payload : { album : mockResponse["subsonic-response"]["album"] } },
            { type: types.END_ASYNC_OPERATION }
        ]
        
        const store = mockStore({ albums: {byId:{}} })
        return store.dispatch(actions.loadAlbum("album_id")).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
        })
    })

    it('Create an error message when failed to fetch one album', () => {
        // Fetch one album's response
        fetchMock.getOnce('*', 500)

        const expectedActions = [
            { type: types.BEGIN_ASYNC_OPERATION },
            { type: types.END_ASYNC_OPERATION, alert : { type : alerts.ALERT_TYPE_ERROR } }
        ]
        
        const store = mockStore({ albums: {byId:{}} })
        return store.dispatch(actions.loadAlbum("album_id")).then(() => {
            // return of async actions
            const actions = store.getActions()
            expect(actions).toMatchObject(expectedActions)
        })
    })

})