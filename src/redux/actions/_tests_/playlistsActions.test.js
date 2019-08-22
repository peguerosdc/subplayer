// Mocking redux
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'
// Own imports to test
import * as actions from '../playlistsActions'
import * as types from '../actionTypes'
import * as alerts from "../alertsActions"

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe('playlists actions', () => {

    afterEach(() => {
        fetchMock.restore()
    })

    it('creates a LOAD_PLAYLISTS_SUCCESS when successfully fetching the list of playlists', () => {
        fetchMock.getOnce('*', {
            body: {"subsonic-response": { "status" : "ok", "playlists" : { "playlist" : [] } }, "status": "ok","version": "1.9.0"},
            headers: { 'content-type': 'application/json' }
        })

        const expectedActions = [
            { type: types.BEGIN_ASYNC_OPERATION },
            { type: types.LOAD_PLAYLISTS_SUCCESS, payload : {} },
            { type: types.END_ASYNC_OPERATION }
        ]
        
        const store = mockStore({})
        return store.dispatch(actions.loadPlaylists()).then(() => {
            // return of async actions
            expect(store.getActions()).toMatchObject(expectedActions)
        })
    })

    it('creates an ERROR alert when failing to fetch the list of playlists', () => {
        fetchMock.getOnce('*', 500)

        const expectedActions = [
            { type: types.BEGIN_ASYNC_OPERATION },
            { type: types.END_ASYNC_OPERATION, alert : { type : alerts.ALERT_TYPE_ERROR } }
        ]
        
        const store = mockStore({})
        return store.dispatch(actions.loadPlaylists()).then(() => {
            // return of async actions
            expect(store.getActions()).toMatchObject(expectedActions)
        })
    })

    it('creates an ADD_SONGS_TO_PLAYLIST_RESULT with a success message when adding songs to a playlist', () => {
        fetchMock.getOnce('glob:*getPlaylist*', {
            "subsonic-response": {
                "playlist": {
                    id : "1",
                    entry : []
                },
                "status": "ok","version": "1.9.0"
            }
        })

        fetchMock.getOnce('glob:*updatePlaylist*', {
            "subsonic-response": {
                "status": "ok","version": "1.9.0"
            }
        })

        const expectedActions = [
            { type: types.BEGIN_ASYNC_OPERATION },
            { type: types.ADD_SONGS_TO_PLAYLIST_RESULT, payload : {} },
            { type: types.END_ASYNC_OPERATION, alert : { type : alerts.ALERT_TYPE_SUCCESS } }
        ]
        
        const store = mockStore({})
        return store.dispatch(actions.addSongsToPlaylist({"id" : "1"}, [{"id" : "song1"}])).then(() => {
            // return of async actions
            expect(store.getActions()).toMatchObject(expectedActions)
        })
    })

    it('creates an error message when failing to add songs to a playlist', () => {
        fetchMock.getOnce('glob:*getPlaylist*', {
            "subsonic-response": {
                "playlist": {
                    id : "1",
                    entry : []
                },
                "status": "ok","version": "1.9.0"
            }
        })

        fetchMock.getOnce('glob:*updatePlaylist*', {
            "subsonic-response": {
                "status": "failure", "version": "1.9.0", "error" : {message : "ERROR MESSAGE"}
            }
        })

        const expectedActions = [
            { type: types.BEGIN_ASYNC_OPERATION },
            { type: types.END_ASYNC_OPERATION, alert : { type : alerts.ALERT_TYPE_ERROR } }
        ]
        
        const store = mockStore({})
        return store.dispatch(actions.addSongsToPlaylist({"id" : "1"}, [{"id" : "song1"}])).then(() => {
            // return of async actions
            expect(store.getActions()).toMatchObject(expectedActions)
        })
    })

    it('creates a warning message when adding songs to a playlist with already added songs', () => {
        fetchMock.getOnce('glob:*getPlaylist*', {
            "subsonic-response": {
                "playlist": {
                    id : "1",
                    entry : [{"id" : "song1"}]
                },
                "status": "ok","version": "1.9.0"
            }
        })

        fetchMock.getOnce('glob:*updatePlaylist*', {
            "subsonic-response": {
                "status": "ok","version": "1.9.0"
            }
        })

        const expectedActions = [
            { type: types.BEGIN_ASYNC_OPERATION },
            { type: types.END_ASYNC_OPERATION, alert : { type : alerts.ALERT_TYPE_WARNING } }
        ]
        
        const store = mockStore({})
        return store.dispatch(actions.addSongsToPlaylist({"id" : "1"}, [{"id" : "song1"}])).then(() => {
            // return of async actions
            expect(store.getActions()).toMatchObject(expectedActions)
        })
    })

    it('creates an error message when failing to add songs to a playlist by an unknown reason', () => {
        fetchMock.getOnce('glob:*getPlaylist*', 500)

        fetchMock.getOnce('glob:*updatePlaylist*', 500)

        const expectedActions = [
            { type: types.BEGIN_ASYNC_OPERATION },
            { type: types.END_ASYNC_OPERATION, alert : { type : alerts.ALERT_TYPE_ERROR } }
        ]
        
        const store = mockStore({})
        return store.dispatch(actions.addSongsToPlaylist({"id" : "1"}, [{"id" : "song1"}])).then(() => {
            // return of async actions
            expect(store.getActions()).toMatchObject(expectedActions)
        })
    })

    it('creates an REMOVE_SONGS_FROM_PLAYLIST_RESULT with a success message when removing songs from a playlist', () => {
        fetchMock.getOnce('glob:*updatePlaylist*', {
            "subsonic-response": {
                "status": "ok","version": "1.9.0"
            }
        })

        const expectedActions = [
            { type: types.BEGIN_ASYNC_OPERATION },
            // The REMOVE_SONGS_FROM_PLAYLIST_RESULT must contain information of the songs removed
            { type: types.REMOVE_SONGS_FROM_PLAYLIST_RESULT, payload : {
                playlist : { id : "1" },
                removedSongs : [{ id : "song1" }]
            }},
            { type: types.END_ASYNC_OPERATION, alert : { type : alerts.ALERT_TYPE_SUCCESS } }
        ]
        
        const store = mockStore({})
        return store.dispatch(actions.removeSongsFromPlaylist({"id" : "1"}, [{"id" : "song1"}], [0])).then(() => {
            // return of async actions
            expect(store.getActions()).toMatchObject(expectedActions)
        })
    })

    it('creates an error message when failing to remove songs from a playlist', () => {
        fetchMock.getOnce('glob:*updatePlaylist*', {
            "subsonic-response": {
                "status": "failure", "version": "1.9.0", "error" : {message : "ERROR MESSAGE"}
            }
        })

        const expectedActions = [
            { type: types.BEGIN_ASYNC_OPERATION },
            { type: types.END_ASYNC_OPERATION, alert : { type : alerts.ALERT_TYPE_ERROR } }
        ]
        
        const store = mockStore({})
        return store.dispatch(actions.removeSongsFromPlaylist({"id" : "1"}, [{"id" : "song1"}], [0])).then(() => {
            // return of async actions
            expect(store.getActions()).toMatchObject(expectedActions)
        })
    })

    it('creates an error message when failing to remove songs from a playlist by an unknown reason', () => {
        fetchMock.getOnce('glob:*updatePlaylist*', 500)

        const expectedActions = [
            { type: types.BEGIN_ASYNC_OPERATION },
            { type: types.END_ASYNC_OPERATION, alert : { type : alerts.ALERT_TYPE_ERROR } }
        ]
        
        const store = mockStore({})
        return store.dispatch(actions.removeSongsFromPlaylist({"id" : "1"}, [{"id" : "song1"}], [0])).then(() => {
            // return of async actions
            expect(store.getActions()).toMatchObject(expectedActions)
        })
    })

    it('creates an DELETE_PLAYLIST_RESULT with a success message when deleting a playlist', () => {
        fetchMock.getOnce('glob:*deletePlaylist*', {
            "subsonic-response": {
                "status": "ok","version": "1.9.0"
            }
        })

        const expectedActions = [
            { type: types.BEGIN_ASYNC_OPERATION },
            // The DELETE_PLAYLIST_RESULT must contain information of the songs removed
            { type: types.DELETE_PLAYLIST_RESULT, payload : {
                playlist : {}
            }},
            { type: types.END_ASYNC_OPERATION, alert : { type : alerts.ALERT_TYPE_SUCCESS } }
        ]
        
        const store = mockStore({})
        return store.dispatch(actions.deletePlaylist({id: "playlist1"})).then(() => {
            // return of async actions
            expect(store.getActions()).toMatchObject(expectedActions)
        })
    })

    it('creates an error message when failing to delete a playlist', () => {
        fetchMock.getOnce('glob:*deletePlaylist*', {
            "subsonic-response": {
                "status": "failure", "version": "1.9.0", "error" : {message : "ERROR MESSAGE"}
            }
        })

        const expectedActions = [
            { type: types.BEGIN_ASYNC_OPERATION },
            { type: types.END_ASYNC_OPERATION, alert : { type : alerts.ALERT_TYPE_ERROR } }
        ]
        
        const store = mockStore({})
        return store.dispatch(actions.deletePlaylist({id: "playlist1"})).then(() => {
            // return of async actions
            expect(store.getActions()).toMatchObject(expectedActions)
        })
    })

    it('creates an error message when failing to delete a playlist by an unknown reason', () => {
        fetchMock.getOnce('glob:*deletePlaylist*', 500)

        const expectedActions = [
            { type: types.BEGIN_ASYNC_OPERATION },
            { type: types.END_ASYNC_OPERATION, alert : { type : alerts.ALERT_TYPE_ERROR } }
        ]
        
        const store = mockStore({})
        return store.dispatch(actions.deletePlaylist({id: "playlist1"})).then(() => {
            // return of async actions
            expect(store.getActions()).toMatchObject(expectedActions)
        })
    })

    it('creates and reloads the playlists with a success message when creating a new playlist', () => {
        fetchMock.get('glob:*createPlaylist*', {
            "subsonic-response": {
                "status": "ok","version": "1.9.0"
            }
        })

        fetchMock.getOnce('glob:*getPlaylists*', {
            body: {"subsonic-response": { "status" : "ok", "playlists" : { "playlist" : [] } }, "status": "ok","version": "1.9.0"},
            headers: { 'content-type': 'application/json' }
        })

        const expectedActions = [
            { type: types.BEGIN_ASYNC_OPERATION },
            { type: types.END_ASYNC_OPERATION, alert : { type : alerts.ALERT_TYPE_SUCCESS } },
            { type: types.LOAD_PLAYLISTS_SUCCESS, payload: { playlists : []} }
        ]
        
        const store = mockStore({})
        return store.dispatch(actions.createPlaylist("playlist")).then(() => {
            // return of async actions
            expect(store.getActions()).toMatchObject(expectedActions)
        })
    })

    it('creates an error message when failing to create a playlist', () => {
        fetchMock.get('*', {
            "subsonic-response": {
                "status": "failure", "version": "1.9.0", "error" : {message : "ERROR MESSAGE"}
            }
        })

        const expectedActions = [
            { type: types.BEGIN_ASYNC_OPERATION },
            { type: types.END_ASYNC_OPERATION, alert : { type : alerts.ALERT_TYPE_ERROR } }
        ]
        
        const store = mockStore({})
        return store.dispatch(actions.createPlaylist("playlist")).then(() => {
            // return of async actions
            expect(store.getActions()).toMatchObject(expectedActions)
        })
    })

    it('creates an error message when failing to create a playlist by an unknown reason', () => {
        fetchMock.get('*', 500)

        const expectedActions = [
            { type: types.BEGIN_ASYNC_OPERATION },
            { type: types.END_ASYNC_OPERATION, alert : { type : alerts.ALERT_TYPE_ERROR } }
        ]
        
        const store = mockStore({})
        return store.dispatch(actions.createPlaylist("playlist")).then(() => {
            // return of async actions
            expect(store.getActions()).toMatchObject(expectedActions)
        })
    })

    it('creates an EDIT_PLAYLIST_RESULT with a success message when editing a playlist', () => {
        fetchMock.getOnce('*', {
            "subsonic-response": {
                "status": "ok","version": "1.9.0"
            }
        })

        const expectedActions = [
            { type: types.BEGIN_ASYNC_OPERATION },
            // The EDIT_PLAYLIST_RESULT must contain information of the songs removed
            { type: types.EDIT_PLAYLIST_RESULT, payload : {} },
            { type: types.END_ASYNC_OPERATION, alert : { type : alerts.ALERT_TYPE_SUCCESS } }
        ]
        
        const store = mockStore({})
        return store.dispatch(actions.editPlaylist("id", "name", "comment", true) ).then(() => {
            // return of async actions
            expect(store.getActions()).toMatchObject(expectedActions)
        })
    })

    it('creates an error message when failing to edit a playlist', () => {
        fetchMock.getOnce('*', {
            "subsonic-response": {
                "status": "failure", "version": "1.9.0", "error" : {message : "ERROR MESSAGE"}
            }
        })

        const expectedActions = [
            { type: types.BEGIN_ASYNC_OPERATION },
            { type: types.END_ASYNC_OPERATION, alert : { type : alerts.ALERT_TYPE_ERROR } }
        ]
        
        const store = mockStore({})
        return store.dispatch(actions.editPlaylist("id", "name", "comment", true) ).then(() => {
            // return of async actions
            expect(store.getActions()).toMatchObject(expectedActions)
        })
    })

    it('creates an error message when failing to edit a playlist by an unknown reason', () => {
        fetchMock.getOnce('*', 500)

        const expectedActions = [
            { type: types.BEGIN_ASYNC_OPERATION },
            { type: types.END_ASYNC_OPERATION, alert : { type : alerts.ALERT_TYPE_ERROR } }
        ]
        
        const store = mockStore({})
        return store.dispatch(actions.editPlaylist("id", "name", "comment", true) ).then(() => {
            // return of async actions
            expect(store.getActions()).toMatchObject(expectedActions)
        })
    })

    it('creates a LOAD_SINGLE_PLAYLIST_SUCCESS when successfully fetching a single playlist', () => {
        fetchMock.getOnce('*', {
            body: {"subsonic-response": { "status" : "ok", "playlist" : {} }, "status": "ok","version": "1.9.0"},
            headers: { 'content-type': 'application/json' }
        })

        const expectedActions = [
            { type: types.BEGIN_ASYNC_OPERATION },
            { type: types.LOAD_SINGLE_PLAYLIST_SUCCESS, payload : { playlist : {} } },
            { type: types.END_ASYNC_OPERATION }
        ]
        
        const store = mockStore({})
        return store.dispatch(actions.loadSinglePlaylist("id")).then(() => {
            // return of async actions
            expect(store.getActions()).toMatchObject(expectedActions)
        })
    })

    it('creates an ERROR alert when failing to fetch a single playlist', () => {
        fetchMock.getOnce('*', 500)

        const expectedActions = [
            { type: types.BEGIN_ASYNC_OPERATION },
            { type: types.END_ASYNC_OPERATION, alert : { type : alerts.ALERT_TYPE_ERROR } }
        ]
        
        const store = mockStore({})
        return store.dispatch(actions.loadSinglePlaylist("id")).then(() => {
            // return of async actions
            expect(store.getActions()).toMatchObject(expectedActions)
        })
    })

})