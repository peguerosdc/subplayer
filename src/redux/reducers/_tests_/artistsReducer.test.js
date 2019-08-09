import artistsReducer from "../artistsReducer"
import { logout } from "../../actions/authActions"
import * as actions from "../../actions/artistsActions"

describe('artists reducer', () => {

    it('should return the initial state', () => {
        // Define initial state
        const initialState = { byIndex : [], byId : {} }
        // Expect it to return when no specific action is triggered
        expect( artistsReducer(initialState, {}) ).toEqual(initialState)
    })

    it('should clear the artists on logout', () => {
        // Define initial state
        const initialState = {
            byIndex : [
                {
                    name : 'A',
                    artist : [ {id : '1'} ]
                }
            ],
            byId : {
                '1' : {id : '1'}
            }
        }
        // Expect it to return no albums when logout is triggered
        expect( artistsReducer(initialState, logout()) ).toEqual({ byIndex : [], byId : {} })
    })

    it('should put all the artists by index loaded', () => {
        // Define initial state
        const initialState = { byIndex : [], byId : {} }
        // Define loaded artists' index
        const loadedArtists = [
            {
                name : 'A',
                artist : [ {id : '1'} ]
            }
        ]
        // Expect it to replace the existing index with the new one
        expect(
            artistsReducer(initialState, actions.loadArtistsSuccess(loadedArtists))
        )
        .toEqual({
            byIndex : loadedArtists,
            byId : initialState.byId
        })
    })

    it('should put one normalized artist when loaded', () => {
        // Define initial state
        const initialState = {
            byIndex : [
                {
                    name : 'A',
                    artist : [ {id : '1'} ]
                }
            ],
            byId : {
                '1' : {id : '1'}
            }
        }
        // Define loaded artists' index
        const newArtist = {
            id : '2',
            album : [
                { 'id' : 'album1' },
                { 'id' : 'album2' },
            ]
        }
        const newState = artistsReducer(initialState, actions.loadOneArtistSuccess(newArtist))
        // Expect it to:
        // Keep the index as before
        expect( newState.byIndex ) .toEqual(initialState.byIndex)
        // As only the details of one artist is displayed at a time, we can clear the existing
        // artist.byId with the new one
        expect( newState.byId ) .toEqual({
            '2' : {
                id : '2',
                album : ['album1', 'album2']
            }
        })
    })

})