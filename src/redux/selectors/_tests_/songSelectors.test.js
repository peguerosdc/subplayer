import * as selectors from "../songSelectors"

describe('songs selectors', () => {

    it('should get the songs of 1 album', () => {
        // The store has 2 songs and 1 album
        const state = {
            songs : {
                byId : {
                    '1' : { id : '1'},
                    '2' : { id : '2', }
                }
            },
            albums : {
                byId : {
                    'a1' : {
                        id : 'a1',
                        song : ['2']
                    }
                }
            }
        }
        const props = {
            albumId : 'a1'
        }
        // Should return an array containing song '2' which is the only one belonging
        // to album 'a1'
        const albumSelector = selectors.makeGetSongsOfAlbum()
        const songs = albumSelector(state, props)
        expect(songs).toEqual( [ state.songs.byId['2'] ] )
    })

    it('should get the songs of 1 artist', () => {
        // The store has 2 songs
        const state = {
            songs : {
                byId : {
                    '1' : { id : '1'},
                    '2' : { id : '2', artistId : 'a1' }
                }
            }
        }
        const props = {
            artistId : 'a1'
        }
        // Should return an array containing song '2' which is the only one belonging
        // to album 'a1'
        const songs = selectors.songsOfArtistSelector(state, props)
        expect(songs).toEqual( [ state.songs.byId['2'] ] )
    })

    it('should get the all the songs', () => {
        // The store has 2 songs
        const state = {
            songs : {
                byId : {
                    '1' : { id : '1'},
                    '2' : { id : '2'}
                }
            }
        }
        // Should return an array containing all the available songs
        const songs = selectors.songsSelector(state)
        expect(songs).toEqual( [ state.songs.byId['1'], state.songs.byId['2'] ] )
    })

    it('should get the all the songs of one playlist', () => {
        // The store has 2 songs
        const state = {
            songs : {
                byId : {
                    '1' : { id : '1'},
                    '2' : { id : '2'},
                    '3' : { id : '3'},
                }
            },
            playlists : {
                byId : {
                    '1' : {
                        id : '1',
                        songs : ['1', '3']
                    }
                }
            }
        }
        const props = { playlistId : '1' }
        // Should return an array containing song '1' and '3'
        const songs = selectors.songsOfPlaylistSelector(state, props)
        expect(songs).toEqual( [ state.songs.byId['1'], state.songs.byId['3'] ] )
    })

    it('should get the all the songs starred as favourites', () => {
        // The store has 2 songs
        const state = {
            songs : {
                byId : {
                    '1' : { id : '1'},
                    '2' : { id : '2'},
                    '3' : { id : '3'},
                }
            },
            favourites : ['1', '3']
        }
        // Should return an array containing song '1' and '3'
        const songs = selectors.favouriteSongsSelector(state)
        expect(songs).toEqual( [ state.songs.byId['1'], state.songs.byId['3'] ] )
    })

    it('should get the all the songs of one genre', () => {
        // The store has 2 songs
        const state = {
            songs : {
                byId : {
                    '1' : { id : '1', genre:"rock"},
                    '2' : { id : '2', genre:"rock"},
                    '3' : { id : '3', genre:"pop"},
                }
            }
        }
        const props = { genre : {value:"rock"} }
        // Should return an array containing song '1' and '3'
        const songs = selectors.songsOfGenreSelector(state, props)
        expect(songs).toEqual( [ state.songs.byId['1'], state.songs.byId['2'] ] )
    })


})