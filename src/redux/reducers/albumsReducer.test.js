import albumsReducer from "./albumsReducer"
import * as actions from "../actions/albumActions"
import { logout } from "../actions/authActions"
import { loadOneArtistSuccess, loadSongsOfArtistSuccess } from "../actions/artistsActions"

describe('albums reducer', () => {

    it('should return the initial state', () => {
        // Define initial state
        const initialState = {
            byId : {
                '1' : { id : '1' }
            }
        }
        // Expect it to return when no specific action is triggered
        expect( albumsReducer(initialState, {}) ).toEqual(initialState)
    })

    it('should clear the albums on logout', () => {
        // Define initial state
        const initialState = {
            byId : {
                '1' : { id : '1' }
            }
        }
        // Expect it to return no albums when logout is triggered
        expect( albumsReducer(initialState, logout()) ).toEqual({byId : {}})
    })

    it('should include a new album when loaded', () => {
        // Define initial state
        const initialState = {
            byId : {
                '1' : { id : '1' }
            }
        }
        // Trigger the action on the reducer
        const newState = albumsReducer(
            initialState,
            actions.loadAlbumSuccess({ id:'2', song : [ {'id' : 's1'}, {'id' : 's2'} ] })
        )
        // Expect it now to have two albums. '1' and '2' with '1' unchanged
        expect( newState.byId['1'] ).toEqual(initialState.byId['1'])
        // And '2' normalized (having only the song's ids)
        expect( newState.byId['2'] ).toMatchObject({'id' : '2'})
        expect( newState.byId['2'].song ).toEqual(['s1', 's2'])
    })

    it('should replace all the existing albums when an artist is loaded', () => {
        // Define initial state
        const initialState = {
            byId : {
                '1' : { id : '1' }
            }
        }
        // Trigger the action on the reducer
        const artist = { id : 'a1', album : [{ id:'1' }, {id : '2'}] }
        const newState = albumsReducer(
            initialState,
            loadOneArtistSuccess(artist)
        )
        // We take for granted that this action is only dispatched when loading
        // the view of an artist with all its albums. In that case, the previously loaded
        // albums at any point by the app are no longer needed and have to be cleared,
        // resulting in the store only containing the new albums.
        expect( newState.byId).toEqual({
            '1' : {'id' : '1'},
            '2' : {'id' : '2'},
        })
    })

    it('should fill the matching album (if found) with its corresponding songIds', () => {
        // Define initial state
        const initialState = {
            byId : {
                '1' : { id : '1', song : [] },
                '2' : { id : '1', song : [] }
            }
        }
        // Trigger the action on the reducer
        const newState = albumsReducer(
            initialState,
            loadSongsOfArtistSuccess([
                // Songs of album 1
                {id:'s1', albumId:'1'}, {id:'s2', albumId:'1'},
                // Songs of other album
                {id:'s3', albumId:'3'}
            ])
        )
        // We expect to have:
        // album '1' with 's1' and 's2'
        expect( newState.byId['1'].song ).toEqual( ['s1', 's2'] )
        // album '2' as initial
        expect( newState.byId['2'] ).toEqual( initialState.byId['2'] )
    })

})