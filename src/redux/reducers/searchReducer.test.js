import searchReducer from "./searchReducer"
import { logout } from "../actions/authActions"
import * as actions from "../actions/searchActions"
import { starredSongModified } from "../actions/favouritesActions"

describe('search reducer', () => {

    it('should return the initial state', () => {
        // Define initial state
        const initialState = { albums : [], artists : [], songs : [], songsById : {} }
        // Expect it to return when no specific action is triggered
        expect( searchReducer(initialState, {}) ).toEqual(initialState)
    })

    it('should clear the search on logout', () => {
        // Define initial state
        const initialState = {
            albums : [{'id' : 'al1'}],
            artists : [{'id' : 'ar1'}],
            songs : ['2', '1'],
            songsById : {
                '1' : { id : '1'},
                '2' : { id : '2'}
            }
        }
        // Expect it to return no results when logout is triggered
        expect( searchReducer(initialState, logout()) )
            .toEqual({ albums : [], artists : [], songs : [], songsById : {} })
    })

    it('should put the results on a new search', () => {
        // Define initial state
        const initialState = {
            albums : [{'id' : 'al1'}],
            artists : [{'id' : 'ar1'}],
            songs : ['2', '1'],
            songsById : {
                '1' : { id : '1'},
                '2' : { id : '2'}
            }
        }
        // Set new results
        const results = {
            album : [{'id' : 'al2'}],
            artist : [{'id' : 'ar2'}],
            song : [{ id : 's1' }],
        }
        const newState = searchReducer(initialState, actions.searchAction(results))
        // Expect it to:
        // Store normalized songs
        expect( newState.songsById ).toEqual({ 's1' : { id:'s1' }})
        expect( newState.songs ).toEqual(['s1'])
        // store albums and artists 'as-is'
        expect( newState.albums ).toEqual( results.album )
        expect( newState.artists ).toEqual( results.artist )
    })

    it('should toggle the star on a song if present in the search results', () => {
        // Define initial state
        const initialState = {
            albums : [{'id' : 'al1'}],
            artists : [{'id' : 'ar1'}],
            songs : ['2', '1'],
            songsById : {
                '1' : { id : '1'},
                '2' : { id : '2'}
            }
        }
        const starredValue = new Date().toISOString()
        const newState = searchReducer(initialState, starredSongModified(['1'], starredValue))
        // Expect it to:
        // dont alter the albums, artists and list of songs
        expect( newState.albums ).toEqual( initialState.albums )
        expect( newState.artists ).toEqual( initialState.artists )
        expect( newState.songs ).toEqual( initialState.songs )
        // set the new song as starred
        expect( newState.songsById['1'].starred ).toEqual(starredValue)
        expect( newState.songsById['2'].starred ).toBeUndefined()
    })

    it('should not do anything when a song is starred and not present in the search results', () => {
        // Define initial state
        const initialState = {
            albums : [{'id' : 'al1'}],
            artists : [{'id' : 'ar1'}],
            songs : ['2', '1'],
            songsById : {
                '1' : { id : '1'},
                '2' : { id : '2'}
            }
        }
        const starredValue = new Date().toISOString()
        const newState = searchReducer(initialState, starredSongModified(['3'], starredValue))
        // Expect it to return initial state
        expect( newState ).toEqual( initialState )
    })

    

})