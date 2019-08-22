// Mocking redux
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'
// Own imports to test
import * as alerts from "../alertsActions"
import * as actions from '../favouritesActions'
import * as types from '../actionTypes'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('favourites actions', () => {

    afterEach(() => {
        fetchMock.restore()
    })

    it('creates a LOAD_FAVOURITES_RESULT when successfully loading favourite songs', () => {
        fetchMock.getOnce('*', {
            body: {"subsonic-response": { "status" : "ok", "starred2" : [] }, "status": "ok","version": "1.9.0"},
            headers: { 'content-type': 'application/json' }
        })

        const expectedActions = [
            { type: types.BEGIN_ASYNC_OPERATION },
            { type: types.LOAD_FAVOURITES_RESULT },
            { type: types.END_ASYNC_OPERATION }
        ]
        
        const store = mockStore({})
        return store.dispatch(actions.loadFavouriteSongs()).then(() => {
            // return of async actions
            expect(store.getActions()).toMatchObject(expectedActions)
        })
    })

    it('creates an ERROR alert when failing to load favourite songs', () => {
        fetchMock.getOnce('*', 500)

        const expectedActions = [
            { type: types.BEGIN_ASYNC_OPERATION },
            { type: types.END_ASYNC_OPERATION, alert : { type : alerts.ALERT_TYPE_ERROR } }
        ]
        
        const store = mockStore({})
        return store.dispatch(actions.loadFavouriteSongs()).then(() => {
            // return of async actions
            expect(store.getActions()).toMatchObject(expectedActions)
        })
    })

    it('creates a STAR_SONG_RESULT when successfully starring a song', () => {
        const songs = [ {id : "1"} ]
        fetchMock.getOnce('*', {
            body: {"subsonic-response": { "status" : "ok" }, "status": "ok", "version": "1.9.0"},
            headers: { 'content-type': 'application/json' }
        })

        const expectedActions = [
            { type: types.BEGIN_ASYNC_OPERATION },
            { type: types.STAR_SONG_RESULT },
            { type: types.END_ASYNC_OPERATION }
        ]
        
        const store = mockStore({})
        return store.dispatch(actions.setStarOnSongs(songs, true)).then(() => {
            // return of async actions
            expect(store.getActions()).toMatchObject(expectedActions)
        })
    })

    it('creates a STAR_SONG_RESULT with a warning when trying to star already starred song', () => {
        const songs = [ {id : "1", starred : true} ]
        fetchMock.getOnce('*', {
            body: {"subsonic-response": { "status" : "ok" }, "status": "ok", "version": "1.9.0"},
            headers: { 'content-type': 'application/json' }
        })

        const expectedActions = [
            { type: types.BEGIN_ASYNC_OPERATION },
            { type: types.END_ASYNC_OPERATION, alert : { type : alerts.ALERT_TYPE_WARNING } },
        ]
        
        const store = mockStore({})
        return store.dispatch(actions.setStarOnSongs(songs, true)).then(() => {
            // return of async actions
            expect(store.getActions()).toMatchObject(expectedActions)
        })
    })

    it('creates an error message when failing to star new songs', () => {
        const songs = [ {id : "1"} ]
        fetchMock.getOnce('*', 500)

        const expectedActions = [
            { type: types.BEGIN_ASYNC_OPERATION },
            { type: types.END_ASYNC_OPERATION, alert : {type : alerts.ALERT_TYPE_ERROR} }
        ]
        
        const store = mockStore({})
        return store.dispatch(actions.setStarOnSongs(songs, true)).then(() => {
            // return of async actions
            expect(store.getActions()).toMatchObject(expectedActions)
        })
    })

    it('creates a STAR_SONG_RESULT when successfully unstarring a song', () => {
        const songs = [ {id : "1", starred : true} ]
        fetchMock.getOnce('*', {
            body: {"subsonic-response": { "status" : "ok" }, "status": "ok", "version": "1.9.0"},
            headers: { 'content-type': 'application/json' }
        })

        const expectedActions = [
            { type: types.BEGIN_ASYNC_OPERATION },
            { type: types.STAR_SONG_RESULT },
            { type: types.END_ASYNC_OPERATION }
        ]
        
        const store = mockStore({})
        return store.dispatch(actions.setStarOnSongs(songs, false)).then(() => {
            // return of async actions
            expect(store.getActions()).toMatchObject(expectedActions)
        })
    })

    it('creates an error message when failing to unstar new songs', () => {
        const songs = [ {id : "1", starred : true} ]
        fetchMock.getOnce('*', 500)

        const expectedActions = [
            { type: types.BEGIN_ASYNC_OPERATION },
            { type: types.END_ASYNC_OPERATION, alert : {type : alerts.ALERT_TYPE_ERROR} }
        ]
        
        const store = mockStore({})
        return store.dispatch(actions.setStarOnSongs(songs, false)).then(() => {
            // return of async actions
            expect(store.getActions()).toMatchObject(expectedActions)
        })
    })

})