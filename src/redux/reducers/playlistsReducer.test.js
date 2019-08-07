import playlistsReducer from "./playlistsReducer"
import { logout } from "../actions/authActions"
import * as actions from "../actions/playlistsActions"

describe('playlists reducer', () => {

    it('should return the initial state', () => {
        // Define initial state
        const initialState = {
            'byId' : { '1' : { id: '1' } }
        }
        // Expect it to return when no specific action is triggered
        expect( playlistsReducer(initialState, {}) ).toEqual(initialState)
    })

    it('should clear the playlists on logout', () => {
        // Define initial state
        const initialState = {
            byId : {
                '1' : { id : '1' }
            }
        }
        // Expect it to return no playlists when logout is triggered
        expect( playlistsReducer(initialState, logout()) ).toEqual({byId : {}})
    })
    
    it('should update the metadata of playlists when loaded', () => {
        // Define initial state
        const initialState = {
            byId : {
                '1' : {
                    id : '1',
                    songs : ['s1', 's2'],
                    isMine : false
                }
            }
        }
        // Expect it to update the metadata of playlists preserving old playlists info
        const newPlaylists = [{ id : 'p1', name : 'playlist1' }]
        expect( playlistsReducer(initialState, actions.loadPlaylistsSuccess(newPlaylists)) )
            .toEqual({
                byId : {
                    '1' : {
                        id : '1',
                        songs : ['s1', 's2'],
                        isMine : false
                    },
                    'p1' : {
                        id : 'p1',
                        name : 'playlist1',
                        songs : [],
                        isMine : false
                    }
                }
            })
    })

    it('should update a playlist when new songs are added', () => {
        const playlist = {
            id : '1',
            songs : ['s1', 's2'],
            songCount : 2,
            duration : 20,
            isMine : false
        }
        // Define initial state
        const initialState = {
            byId : {
                '1' : playlist
            }
        }
        // Expect it to add the new songs added, update the songCount and duration
        const songsAdded = [ {id : 's3', duration : 10} ]
        expect( playlistsReducer(initialState, actions.addSongsToPlaylistResult(playlist, songsAdded)) )
            .toEqual({
                byId : {
                    '1' : {
                        id : '1',
                        songs : ['s1', 's2', 's3'],
                        songCount : 3,
                        duration : 30,
                        isMine : false
                    },
                }
            })
    })

    it('should update a playlist when songs are removed', () => {
        const playlist = {
            id : '1',
            songs : ['s1', 's2'],
            songCount : 2,
            duration : 20,
            isMine : false
        }
        // Define initial state
        const initialState = {
            byId : {
                '1' : playlist
            }
        }
        // Expect it to remove the deleted songs, update the songCount and duration
        const songsRemoved = [ {id : 's1', duration : 10} ]
        expect( playlistsReducer(initialState, actions.removeSongsFromPlaylistResult(playlist, songsRemoved)) )
            .toEqual({
                byId : {
                    '1' : {
                        id : '1',
                        songs : ['s2'],
                        songCount : 1,
                        duration : 10,
                        isMine : false
                    },
                }
            })
    })

    it('should remove a playlist when deleted', () => {
        // Define initial state
        const initialState = {
            byId : {
                '1' : { id : '1' },
                '2' : { id : '2' }
            }
        }
        const newState = playlistsReducer(initialState, actions.deletePlaylistSuccess({id:'2'}))
        // Expect it to keep playlist 1 and delete playlist 2
        expect( newState ).toEqual({
            byId : {
                '1' : { id : '1' },
            }
        })
    })

    it('should update a playlist when edited', () => {
        // Define initial state
        const initialState = {
            byId : {
                '1' : { id : '1' },
                '2' : {
                    id : '2',
                    name : 'name2',
                    comment : 'comment2',
                    public : true
                }
            }
        }
        const newState = playlistsReducer(initialState, actions.editPlaylistSuccess('2', 'new name', 'new comment', false))
        // Expect it to edit playlist 2 as stated
        expect( newState.byId['2'] ).toEqual({
            id : '2',
            name : 'new name',
            comment : 'new comment',
            public : false
        })
        //  and keep playlist 1 the same
        expect( newState.byId['1'] ).toEqual(initialState.byId['1'])
    })

    it('should return the state when a playlist is edited with the same values', () => {
        // Define initial state
        const initialState = {
            byId : {
                '1' : { id : '1' },
                '2' : {
                    id : '2',
                    name : 'name2',
                    comment : 'comment2',
                    public : true
                }
            }
        }
        const newState = playlistsReducer(initialState, actions.editPlaylistSuccess('2', 'name2', 'comment2', true))
        expect( newState ).toEqual(initialState)
    })

    it('should put a normalized playlist when it is loaded with its songs', () => {
        // Define initial state
        const playlist = {
            id : '2',
            name : 'name2',
            comment : 'comment2',
            public : true
        }
        const initialState = {
            byId : {
                '1' : { id : '1' },
                '2' : playlist
            }
        }
        // Load playlsit 2 with its songs
        const loadedPlaylist = { ...playlist, entry : [{id : '2'}] }
        const newState = playlistsReducer(initialState, actions.singlePlaylistLoaded(loadedPlaylist))
        // Expect it to put the normalized songs in the details of playlist 2
        expect( newState.byId['2'] ).toEqual({
            ...playlist,
            songs : ['2']
        })
        //  and keep playlist 1 the same
        expect( newState.byId['1'] ).toEqual(initialState.byId['1'])
    })

})