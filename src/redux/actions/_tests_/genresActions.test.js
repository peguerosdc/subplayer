// Mocking redux
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'
// Own imports to test
import * as actions from '../genresActions'
import * as types from '../actionTypes'
import * as alerts from "../alertsActions"

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('genres actions', () => {

    afterEach(() => {
        fetchMock.restore()
    })

    it('creates LOAD_SONGS_OF_GENRE_SUCCESS when fetching all songs of one genre', () => {
        // Fetch all artists
        fetchMock.get('*', {
            body: {"subsonic-response": { "status" : "ok", "songsByGenre" : { "song" : [1,2,3] } }, "status": "ok","version": "1.9.0"},
            headers: { 'content-type': 'application/json' }
        })

        const expectedActions = [
            { type: types.BEGIN_ASYNC_OPERATION },
            { type: types.LOAD_SONGS_OF_GENRE_SUCCESS, payload : { songs : [1,2,3,1,2,3] } },
            { type: types.END_ASYNC_OPERATION },
        ]
        
        const store = mockStore({})
        return store.dispatch(actions.loadSongsOfGenre({value:"blues", songCount:600})).then(() => {
            // return of async actions
            const actions = store.getActions()
            expect(actions).toEqual(expectedActions)
        })
    })

    it('Create an error message when failed to fetch songs of a genre', () => {
        fetchMock.get('*', 500)

        const expectedActions = [
            { type: types.BEGIN_ASYNC_OPERATION },
            { type: types.END_ASYNC_OPERATION, alert : { type : alerts.ALERT_TYPE_ERROR } }
        ]
        
        const store = mockStore({})
        return store.dispatch(actions.loadSongsOfGenre({value:"rock", songCount:200})).then(() => {
            // return of async actions
            const actions = store.getActions()
            expect(actions).toMatchObject(expectedActions)
        })
    })


})