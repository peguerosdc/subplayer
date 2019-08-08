// Mocking redux
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'
// Own imports to test
import * as actions from './artistsActions'
import * as types from './actionTypes'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('artists actions', () => {

    afterEach(() => {
        fetchMock.restore()
    })

    it('creates LOAD_ARTISTS_INDEX_SUCCESS when fetching a list of indexed artists', () => {
        // Fetch all artists
        const mockResponse = {"subsonic-response": {"artists": {"index" : []}, "status": "ok","version": "1.9.0"}}
        fetchMock.getOnce('*', {
            body: mockResponse,
            headers: { 'content-type': 'application/json' }
        })

        const expectedActions = [
            { type: types.BEGIN_ASYNC_OPERATION },
            { type: types.LOAD_ARTISTS_INDEX_SUCCESS, payload : { artistsIndex : mockResponse["subsonic-response"]["artists"]["index"] } },
            { type: types.END_ASYNC_OPERATION }
        ]
        
        const store = mockStore({})
        return store.dispatch(actions.loadArtists()).then(() => {
            // return of async actions
            expect(store.getActions()).toEqual(expectedActions)
        })
    })

    it('Create an error message when failed to fetch list of artists', () => {
        fetchMock.getOnce('*', 500)

        const expectedActions = [
            { type: types.BEGIN_ASYNC_OPERATION },
            { type: types.END_ASYNC_OPERATION, alert : { type : 'ALERT_TYPE_ERROR' } }
        ]
        
        const store = mockStore({})
        return store.dispatch(actions.loadArtists()).then(() => {
            // return of async actions
            const actions = store.getActions()
            expect(actions).toMatchObject(expectedActions)
        })
    })

    it('creates LOAD_ONE_ARTIST_SUCCESS + LOAD_SONGS_OF_ONE_ARTIST_SUCCESS when fetching info and songs of one artist', () => {
        // Fetch all artists
        const mockResponse = {"subsonic-response": {"artist": {"album": [{"artist": "one","artistId": "artist_id","id": "album_id",}],"albumCount": 1,"id": "artist_id","name": "artist"},"status": "ok","version": "1.9.0"}}
        fetchMock.getOnce('glob:*getArtist.view*', {
            body: mockResponse,
            headers: { 'content-type': 'application/json' }
        })
        fetchMock.get('glob:*getAlbum*', {
            body: {"subsonic-response": {"album": {"id": "id","song": [],"songCount": 0},"status": "ok","version": "1.9.0"}},
            headers: { 'content-type': 'application/json' }
        })

        const expectedActions = [
            { type: types.BEGIN_ASYNC_OPERATION },
            { type: types.LOAD_ONE_ARTIST_SUCCESS, payload : { artist : mockResponse["subsonic-response"]["artist"] } },
            { type: types.END_ASYNC_OPERATION },
            { type: types.BEGIN_ASYNC_OPERATION },
            { type: types.LOAD_SONGS_OF_ONE_ARTIST_SUCCESS, payload : { songs : [] } },
            { type: types.END_ASYNC_OPERATION },
        ]
        
        const store = mockStore({})
        return store.dispatch(actions.loadOneArtist("1")).then(() => {
            // return of async actions
            const actions = store.getActions()
            expect(actions).toEqual(expectedActions)
        })
    })

    it('Create an error message when failed to fetch info of one artist', () => {
        fetchMock.get('*', 500)

        const expectedActions = [
            { type: types.BEGIN_ASYNC_OPERATION },
            { type: types.END_ASYNC_OPERATION, alert : { type : 'ALERT_TYPE_ERROR' } }
        ]
        
        const store = mockStore({})
        return store.dispatch(actions.loadOneArtist("1")).then(() => {
            // return of async actions
            const actions = store.getActions()
            expect(actions).toMatchObject(expectedActions)
        })
    })


})