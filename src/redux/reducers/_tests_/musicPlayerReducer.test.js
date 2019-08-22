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

    it('should replace and reset the queue when new songs are added', () => {
        // Define initial state
        const initialState = {
            queue : ["1", "2"],
            songsById : {
                "1" : {},
                "2" : {}
            },
            currentSongIndex : 1
        }
        // Add new songs to queue
        const songsToAdd = [ {id: 's1'}, {id: 's2'} ]
        const newState = musicPlayerReducer(initialState, actions.addSongsToQueue(songsToAdd))
        // Expect it to:
        // Store normalized songs
        expect( newState.songsById ).toEqual({
            's1' : { id:'s1' }, 's2' : { id : 's2' }
        })
        expect( newState.queue ).toEqual(['s1', 's2'])
        // start playing song at position 0
        expect( newState.currentSongIndex ).toEqual(0)
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

    it('should not play anything when the next song is asked and there is nothing left in the queue', () => {
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
        expect( newState.queue ).toEqual( initialState.queue )
        expect( newState.songsById ).toEqual( initialState.songsById )
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