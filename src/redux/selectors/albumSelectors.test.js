import * as selectors from "./albumSelectors"

describe('album selectors', () => {

    it('should filter the albums of an specific artist', () => {
        // All albums should go in the state
        const state = {
            albums : {
                byId : {
                    '1' : {
                        id : '1',
                        artistId : 'nope'
                    },
                    '2' : {
                        id : '2',
                        artistId : 'artist1'
                    }
                }
            }
        }
        // Artist Id should go in props
        const props = { artistId : 'artist1' }
        // Albums should have only album 2
        const albums = selectors.getAlbumsOfArtist(state, props)
        expect(albums).toEqual( [{id : '2', artistId : 'artist1'}] )
    })


})