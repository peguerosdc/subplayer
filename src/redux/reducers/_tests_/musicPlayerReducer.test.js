import musicPlayerReducer from "../musicPlayerReducer"
import { logout } from "../../actions/authActions"
import * as actions from "../../actions/songsActions"
import { starredSongModified } from "../../actions/favouritesActions"

describe('music player reducer', () => {

    it('should return the initial state', () => {
        // Define initial state
        const initialState = {queue : [], songsById : {}, currentSongIndex : null}
        // Expect it to return when no specific action is triggered
        expect( musicPlayerReducer(initialState, {}) ).toEqual(initialState)
    })

    it('should clear the queue on logout', () => {
        // Define initial state
        const initialState = {
            queue : ["1", "2"],
            songsById : {
                "1" : {},
                "2" : {}
            },
            currentSongIndex : 1
        }
        // Expect it to return no queue when logout is triggered
        expect( musicPlayerReducer(initialState, logout()) ).toEqual({queue : [], songsById : {}, currentSongIndex : null})
    })

    it('should remove songs from the queue and keep playing the ones remaining', () => {
        // Define initial state
        const initialState = {
            queue : ["1", "2", "3", "4"],
            songsById : {
                "1" : {},
                "2" : {},
                "3" : {},
                "4" : {},
            },
            currentSongIndex : 1
        }
        /* Remove songs. Note: because of the UI, the case where a song with an index < currentSongIndex
         * is removed should not be considered. */
        const songsToRemove = [ {id:'3'}, {id: '4'} ]
        const newState = musicPlayerReducer(initialState, actions.removeSongsFromQueue(songsToRemove))
        // Expect it to remove those songs
        expect( newState.queue ).toEqual(['1','2'])
    })

    it('should play the next song when the one currently playing is removed', () => {
        // Define initial state
        const initialState = {
            queue : ["1", "2", "3"],
            songsById : {
                "1" : {},
                "2" : {},
                "3" : {},
            },
            currentSongIndex : 1
        }
        /* Remove songs. Note: because of the UI, the case where a song with an index < currentSongIndex
         * is removed should not be considered. */
        const songsToRemove = [ {id:'2'} ]
        const newState = musicPlayerReducer(initialState, actions.removeSongsFromQueue(songsToRemove))
        // Expect it to remove those songs and to play the next one (which has now the same index)
        expect( newState.queue ).toEqual(['1','3'])
        expect( newState.currentSongIndex ).toEqual(1)
    })

    it('should remove songs from the queue and clear it when no more songs are pending to be played', () => {
        // Define initial state
        const initialState = {
            queue : ["1", "2", "3", "4"],
            songsById : {
                "1" : {},
                "2" : {},
                "3" : {},
                "4" : {},
            },
            currentSongIndex : 3
        }
        /* Put new songs in the queue. Note: because of the UI, the case where a song with an index < currentSongIndex
         * is removed should not be considered. */
        const songsToRemove = [ {id: '4'} ]
        const newState = musicPlayerReducer(initialState, actions.removeSongsFromQueue(songsToRemove))
        // Expect it to remove those songs and clear the queue as the song currently playing was removed
        expect( newState.queue ).toEqual([])
    })

    it('should replace and reset the queue when new songs are put', () => {
        // Define initial state
        const initialState = {
            queue : ["1", "2"],
            songsById : {
                "1" : {},
                "2" : {}
            },
            currentSongIndex : 1
        }
        // Put new songs in the queue
        const songsToAdd = [ {id: 's1'}, {id: 's2'} ]
        const newState = musicPlayerReducer(initialState, actions.putSongsInQueue(songsToAdd))
        // Expect it to:
        // Store normalized songs
        expect( newState.songsById ).toEqual({
            's1' : { id:'s1' }, 's2' : { id : 's2' }
        })
        expect( newState.queue ).toEqual(['s1', 's2'])
        // start playing song at position 0
        expect( newState.currentSongIndex ).toEqual(0)
    })

    it('should append songs to the existing queue when songs are added', () => {
        // Define initial state
        const initialState = {
            queue : ["1", "2"],
            songsById : {
                "1" : { id:'1' },
                "2" : { id:'2' }
            },
            currentSongIndex : 1
        }
        // Add new songs to queue
        const songsToAdd = [ {id: 's1'}, {id: 's2'} ]
        const newState = musicPlayerReducer(initialState, actions.addSongsToQueue(songsToAdd))
        // Expect it to:
        // Store normalized songs
        expect( newState.songsById ).toEqual({
            // old songs
            '1' : { id:'1' }, '2' : { id : '2' },
            // new songs
            's1' : { id:'s1' }, 's2' : { id : 's2' }
        })
        expect( newState.queue ).toEqual(['1', '2', 's1', 's2'])
        // the current song playing should remain playing
        expect( newState.currentSongIndex ).toEqual(1)
    })

    it('should play the next song in the queue when available', () => {
        // Define initial state
        const initialState = {
            queue : ["1", "2"],
            songsById : {
                "1" : {},
                "2" : {}
            },
            currentSongIndex : 0
        }
        const newState = musicPlayerReducer(initialState, actions.playNextSong())
        // Expect it to:
        // dont alter the queue
        expect( newState.queue ).toEqual( initialState.queue )
        expect( newState.songsById ).toEqual( initialState.songsById )
        // start playing song at position 1
        expect( newState.currentSongIndex ).toEqual(1)
    })

    it('should clear the queue when the next song is asked and there is nothing left to play', () => {
        // Define initial state
        const initialState = {
            queue : ["1", "2"],
            songsById : {
                "1" : {},
                "2" : {}
            },
            currentSongIndex : 1
        }
        const newState = musicPlayerReducer(initialState, actions.playNextSong())
        // Expect it to:
        // dont alter the queue
        expect( newState.queue ).toEqual([])
        expect( newState.songsById ).toEqual( {} )
        // When no 'next' song is available, don't play anything
        expect( newState.currentSongIndex ).toBeNull()
    })

    it('should play the previous song in the queue when available', () => {
        // Define initial state
        const initialState = {
            queue : ["1", "2"],
            songsById : {
                "1" : {},
                "2" : {}
            },
            currentSongIndex : 1
        }
        const newState = musicPlayerReducer(initialState, actions.playPreviousSong())
        // Expect it to:
        // dont alter the queue
        expect( newState.queue ).toEqual( initialState.queue )
        expect( newState.songsById ).toEqual( initialState.songsById )
        // start playing song at position 0
        expect( newState.currentSongIndex ).toEqual(0)
    })

    it('should not play anything when the prevous song is asked and there is nothing before in the queue', () => {
        // Define initial state
        const initialState = {
            queue : ["1", "2"],
            songsById : {
                "1" : {},
                "2" : {}
            },
            currentSongIndex : 0
        }
        const newState = musicPlayerReducer(initialState, actions.playPreviousSong())
        // Expect it to:
        // dont alter the queue
        expect( newState.queue ).toEqual( initialState.queue )
        expect( newState.songsById ).toEqual( initialState.songsById )
        // When no 'next' song is available, don't play anything
        expect( newState.currentSongIndex ).toBeNull()
    })

    it('should toggle the star on a song if present in the queue', () => {
        // Define initial state
        const initialState = {
            queue : ["1", "2"],
            songsById : {
                "1" : {},
                "2" : {}
            },
            currentSongIndex : 0
        }
        const starredValue = new Date().toISOString()
        const newState = musicPlayerReducer(initialState, starredSongModified(['1'], starredValue))
        // Expect it to:
        // dont alter the queue
        expect( newState.queue ).toEqual( initialState.queue )
        expect( newState.currentSongIndex ).toEqual( initialState.currentSongIndex )
        // set the new song as starred
        expect( newState.songsById['1'].starred ).toEqual(starredValue)
        expect( newState.songsById['2'].starred ).toBeUndefined()
    })

    it('should not do anything when a song is starred and not present in the queue', () => {
        // Define initial state
        const initialState = {
            queue : ["1", "2"],
            songsById : {
                "1" : {},
                "2" : {}
            },
            currentSongIndex : 0
        }
        const starredValue = new Date().toISOString()
        const newState = musicPlayerReducer(initialState, starredSongModified(['3'], starredValue))
        // Expect it to return initial state
        expect( newState ).toEqual( initialState )
    })

    

})