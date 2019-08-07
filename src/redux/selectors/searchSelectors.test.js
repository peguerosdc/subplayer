import * as selectors from "./searchSelectors"

describe('search selectors', () => {

    it('should get the metadata of the songs in the search results', () => {
        // The search results have 2 songs
        const state = {
            search : {
                songs : ['2', '1'],
                songsById : {
                    '1' : { id : '1'},
                    '2' : { id : '2'}
                }
            }
        }
        // Should return an array containing song '2' and '1'
        const songs = selectors.searchSongsSelector(state)
        expect(songs).toEqual( [ state.search.songsById['2'], state.search.songsById['1'] ] )
    })


})