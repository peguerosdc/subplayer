import favouritesReducer from "../favouritesReducer"
import * as actions from "../../actions/favouritesActions"
import { logout } from "../../actions/authActions"

describe('async tasks reducer', () => {

    it('should return the initial state', () => {
        // Define initial state
        const initialState = []
        // Expect it to return when no specific action is triggered
        expect( favouritesReducer(initialState, {}) ).toEqual(initialState)
    })

    it('should clear the favourites on logout', () => {
        const initialState = [ '1', '2', '3' ]
        expect( favouritesReducer(initialState, logout() ) ).toEqual([])
    })

    it('should put the favourites when loaded', () => {
        const initialState = [ '1', '2', '3' ]
        const favSongs = [ { id: '4'}, { id : '5'} ]
        expect( favouritesReducer(initialState, actions.favouriteSongsLoaded(favSongs) ) ).toEqual(['4', '5'])
    })

    it('should add the new songs to favourites when starred', () => {
        const initialState = [ '1', '2', '3' ]
        expect(
            favouritesReducer(initialState, actions.starredSongModified(['4', '5'], new Date().toISOString()) )
        ).toEqual([ '1', '2', '3', '4', '5'])
    })

    it('should remove the songs from favourites when unstarred', () => {
        const initialState = [ '1', '2', '3' ]
        expect(
            favouritesReducer(initialState, actions.starredSongModified(['2'], false) )
        ).toEqual([ '1', '3'])
    })

})