import songsReducer from "../songsReducer"
import { logout } from "../../actions/authActions"
import { favouriteSongsLoaded, starredSongModified } from "../../actions/favouritesActions"
import { loadSongsOfArtistSuccess } from "../../actions/artistsActions"
import { loadAlbumSuccess } from "../../actions/albumActions"
import { singlePlaylistLoaded } from "../../actions/playlistsActions"

describe('songs reducer', () => {

    it('should return the initial state', () => {
        // Define initial state
        const initialState = {
            byId : {
                '1' : { id : '1' }
            }
        }
        // Expect it to return when no specific action is triggered
        expect( songsReducer(initialState, {}) ).toEqual(initialState)
    })

    it('should clear the songs on logout', () => {
        // Define initial state
        const initialState = {
            byId : {
                '1' : { id : '1' }
            }
        }
        // Expect it to return no albums when logout is triggered
        expect( songsReducer(initialState, logout()) ).toEqual({byId : {}})
    })

    it('should put the songs when favourites are loaded', () => {
        // Define initial state
        const initialState = {
            byId : {
                '1' : { id : '1' }
            }
        }
        // Expect it to replace the existing songs
        const favouriteSongs = [{id : '2'}]
        expect( songsReducer(initialState, favouriteSongsLoaded(favouriteSongs)) )
            .toEqual({
                byId : {
                    '2' : {
                        id : '2'
                    }
                }
            })
    })

    it('should put the songs when one artist is loaded', () => {
        // Define initial state
        const initialState = {
            byId : {
                '1' : { id : '1' }
            }
        }
        // Expect it to replace the existing songs
        const newSongs = [{id : '2'}]
        expect( songsReducer(initialState, loadSongsOfArtistSuccess(newSongs)) )
            .toEqual({
                byId : {
                    '2' : {
                        id : '2'
                    }
                }
            })
    })

    it('should put the songs when one album is loaded', () => {
        // Define initial state
        const initialState = {
            byId : {
                '1' : { id : '1' }
            }
        }
        // Expect it to replace the existing songs
        const newAlbum = { id : 'a1', song : [{id : '2'}] }
        expect( songsReducer(initialState, loadAlbumSuccess(newAlbum)) )
            .toEqual({
                byId : {
                    '2' : {
                        id : '2'
                    }
                }
            })
    })

    it('should put the songs when one playlist is loaded', () => {
        // Define initial state
        const initialState = {
            byId : {
                '1' : { id : '1' }
            }
        }
        // Expect it to replace the existing songs
        const newPlaylist = { id : 'p1', entry : [{id : '2'}] }
        expect( songsReducer(initialState, singlePlaylistLoaded(newPlaylist)) )
            .toEqual({
                byId : {
                    '2' : {
                        id : '2'
                    }
                }
            })
    })

    it('should toggle the star on a song if present', () => {
        // Define initial state
        const initialState = {
            byId : {
                '1' : { id : '1'},
                '2' : { id : '2'}
            }
        }
        const starredValue = new Date().toISOString()
        const newState = songsReducer(initialState, starredSongModified(['1'], starredValue))
        // Expect it to set the new song as starred
        expect( newState.byId['1'].starred ).toEqual(starredValue)
        expect( newState.byId['2'].starred ).toBeUndefined()
    })

    it('should not do anything when a song is starred and not present', () => {
        // Define initial state
        const initialState = {
            byId : {
                '1' : { id : '1'},
                '2' : { id : '2'}
            }
        }
        const starredValue = new Date().toISOString()
        const newState = songsReducer(initialState, starredSongModified(['3'], starredValue))
        // Expect it to return initial state
        expect( newState ).toEqual( initialState )
    })

})