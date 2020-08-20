import musicPlayerReducer from "../musicPlayerReducer"
import { logout } from "../../actions/authActions"
import * as actions from "../../actions/songsActions"
import { starredSongModified } from "../../actions/favouritesActions"
import initialState from "../initialState"

describe('music player reducer', () => {

    it('should return the initial state', () => {
        // Expect it to return when no specific action is triggered
        expect( musicPlayerReducer(initialState.musicPlayer, {}) ).toEqual(initialState.musicPlayer)
    })

    it('should clear the queue on logout', () => {
        // Define initial state
        const thisState = {
            queue : ["1", "2"],
            songsById : {
                "1" : {},
                "2" : {}
            },
            currentSongIndex : 1
        }
        // Expect it to return no queue when logout is triggered
        expect( musicPlayerReducer(thisState, logout()) ).toEqual(initialState.musicPlayer)
    })

    it('should remove songs from the queue and keep playing the ones remaining', () => {
        // Define initial state
        const thisState = {
            queue : ["1", "2", "3", "4"],
            original : ["1", "2", "3", "4"],
            songsById : {
                "1" : {},
                "2" : {},
                "3" : {},
                "4" : {},
            },
            currentSongIndex : 1,
            currentSongId : '2',
        }
        /* Remove songs. Note: because of the UI, the case where a song with an index < currentSongIndex
         * is removed should not be considered. */
        const songsToRemove = [ {id:'3'}, {id: '4'} ]
        const newState = musicPlayerReducer(thisState, actions.removeSongsFromQueue(songsToRemove))
        // Expect it to remove those songs
        expect( newState.queue ).toEqual(['1','2'])
    })

    it('should play the next song when the one currently playing is removed', () => {
        // Define initial state
        const thisState = {
            queue : ["1", "2", "3"],
            original : ["1", "2", "3"],
            songsById : {
                "1" : {},
                "2" : {},
                "3" : {},
            },
            currentSongIndex : 1,
            currentSongId : '2',
        }
        /* Remove songs. Note: because of the UI, the case where a song with an index < currentSongIndex
         * is removed should not be considered. */
        const songsToRemove = [ {id:'2'} ]
        const newState = musicPlayerReducer(thisState, actions.removeSongsFromQueue(songsToRemove))
        // Expect it to remove those songs and to play the next one (which has now the same index)
        expect( newState.queue ).toEqual(['1','3'])
        expect( newState.currentSongIndex ).toEqual(1)
    })

    it('should remove songs from the queue and clear it when no more songs are pending to be played', () => {
        // Define initial state
        const thisState = {
            queue : ["1", "2", "3", "4"],
            original : ["1", "2", "3", "4"],
            songsById : {
                "1" : {},
                "2" : {},
                "3" : {},
                "4" : {},
            },
            currentSongIndex : 3,
            currentSongId : '4',
        }
        /* Put new songs in the queue. Note: because of the UI, the case where a song with an index < currentSongIndex
         * is removed should not be considered. */
        const songsToRemove = [ {id: '4'} ]
        const newState = musicPlayerReducer(thisState, actions.removeSongsFromQueue(songsToRemove))
        // Expect it to remove those songs and clear the queue as the song currently playing was removed
        expect( newState.queue ).toEqual([])
    })

    it('should replace and reset the queue when new songs are put', () => {
        // Define initial state
        const thisState = {
            queue : ["1", "2"],
            original : ["1", "2"],
            songsById : {
                "1" : {},
                "2" : {}
            },
            currentSongIndex : 1,
            currentSongId : '2',
        }
        // Put new songs in the queue
        const songsToAdd = [ {id: 's1'}, {id: 's2'} ]
        const newState = musicPlayerReducer(thisState, actions.putSongsInQueue(songsToAdd))
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
        const thisState = {
            queue : ["1", "2"],
            original : ["1", "2"],
            songsById : {
                "1" : { id:'1' },
                "2" : { id:'2' }
            },
            currentSongIndex : 1,
            currentSongId : '2',
        }
        // Add new songs to queue
        const songsToAdd = [ {id: 's1'}, {id: 's2'} ]
        const newState = musicPlayerReducer(thisState, actions.addSongsToQueue(songsToAdd))
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
        const thisState = {
            queue : ["1", "2"],
            original : ["1", "2"],
            songsById : {
                "1" : {},
                "2" : {}
            },
            currentSongIndex : 0,
            currentSongId : '1',
        }
        const newState = musicPlayerReducer(thisState, actions.playNextSong())
        // Expect it to:
        // dont alter the queue
        expect( newState.queue ).toEqual( thisState.queue )
        expect( newState.songsById ).toEqual( thisState.songsById )
        // start playing song at position 1
        expect( newState.currentSongIndex ).toEqual(1)
    })

    it('should clear the queue when the next song is asked and there is nothing left to play', () => {
        // Define initial state
        const thisState = {
            queue : ["1", "2"],
            original : ["1", "2"],
            songsById : {
                "1" : {},
                "2" : {}
            },
            currentSongIndex : 1,
            currentSongId : '2',
        }
        const newState = musicPlayerReducer(thisState, actions.playNextSong())
        // Expect it to clear the queue
        expect( newState ).toEqual( initialState.musicPlayer)
    })

    it('should play the previous song in the queue when available', () => {
        // Define initial state
        const thisState = {
            queue : ["1", "2"],
            original : ["1", "2"],
            songsById : {
                "1" : {},
                "2" : {}
            },
            currentSongIndex : 1,
            currentSongId : '2',
        }
        const newState = musicPlayerReducer(thisState, actions.playPreviousSong())
        // Expect it to:
        // dont alter the queue
        expect( newState.queue ).toEqual( thisState.queue )
        expect( newState.songsById ).toEqual( thisState.songsById )
        // start playing song at position 0
        expect( newState.currentSongIndex ).toEqual(0)
    })

    it('should not play anything when the prevous song is asked and there is nothing before in the queue', () => {
        // Define initial state
        const thisState = {
            queue : ["1", "2"],
            original : ["1", "2"],
            songsById : {
                "1" : {},
                "2" : {}
            },
            currentSongIndex : 0,
            currentSongId : '1',
        }
        const newState = musicPlayerReducer(thisState, actions.playPreviousSong())
        // Expect it to clear the queue
        expect( newState ).toEqual( initialState.musicPlayer)
    })

    it('should toggle the star on a song if present in the queue', () => {
        // Define initial state
        const thisState = {
            queue : ["1", "2"],
            original : ["1", "2"],
            songsById : {
                "1" : {},
                "2" : {}
            },
            currentSongIndex : 0,
            currentSongId : '1',
        }
        const starredValue = new Date().toISOString()
        const newState = musicPlayerReducer(thisState, starredSongModified(['1'], starredValue))
        // Expect it to:
        // dont alter the queue
        expect( newState.queue ).toEqual( thisState.queue )
        expect( newState.currentSongIndex ).toEqual( thisState.currentSongIndex )
        // set the new song as starred
        expect( newState.songsById['1'].starred ).toEqual(starredValue)
        expect( newState.songsById['2'].starred ).toBeUndefined()
    })

    it('should not do anything when a song is starred and not present in the queue', () => {
        // Define initial state
        const thisState = {
            queue : ["1", "2"],
            original : ["1", "2"],
            songsById : {
                "1" : {},
                "2" : {}
            },
            currentSongIndex : 0,
            currentSongId : '1',
        }
        const starredValue = new Date().toISOString()
        const newState = musicPlayerReducer(thisState, starredSongModified(['3'], starredValue))
        // Expect it to return initial state
        expect( newState ).toEqual( thisState )
    })

    it('should shuffle all the songs when shuffle is turned on', () => {
        // Define initial state
        const thisState = {
            queue : ["1", "2", "3", "4", "5"],
            original : ["1", "2", "3", "4", "5"],
            songsById : {
                "1" : {},
                "2" : {},
                "3" : {},
                "4" : {},
                "5" : {},
            },
            currentSongIndex : 4,
            currentSongId : '5',
        }
        const newState = musicPlayerReducer(thisState, actions.toggleShuffle(true))
        // As we can't test the random method, just test the overall behaviour
        expect( newState.original ).toEqual( thisState.original )
        expect( newState.songsById ).toEqual( thisState.songsById )
        expect( newState.currentSongIndex ).toEqual( 0 )
        expect( newState.currentSongId ).toEqual( thisState.currentSongId )
    })

    it('should recover original order of songs if shuffle is turned off', () => {
        // Define initial state
        const thisState = {
            queue : ["1", "2", "3", "4", "5"],
            original : ["1", "2", "3", "4", "5"],
            songsById : {
                "1" : {},
                "2" : {},
                "3" : {},
                "4" : {},
                "5" : {},
            },
            currentSongIndex : 3,
            currentSongId : '4',
        }
        const newState = musicPlayerReducer(thisState, actions.toggleShuffle(false))
        // Here we can fully test the queue
        expect( newState.queue ).toEqual(["4", "5"])
        expect( newState.original ).toEqual( thisState.original )
        expect( newState.songsById ).toEqual( thisState.songsById )
        expect( newState.currentSongIndex ).toEqual( 0 )
        expect( newState.currentSongId ).toEqual( thisState.currentSongId )
    })
    

})