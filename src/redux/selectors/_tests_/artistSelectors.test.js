import * as selectors from "../artistSelectors"

describe('artist selectors', () => {

    it('should flatten the aritst.byIndex object', () => {
        // All artists should go in the state
        const state = {
            artists : {
                byIndex : [
                    { name : "#", artist : [{id : "1"}] },
                    { name : "A", artist : [{id : "2"}, {id: "3"}] },
                ]
            }
        }
        // Albums should have only album 2
        const artists = selectors.getArtistsWithHeaders(state)
        expect(artists).toEqual([ {header:"#"}, {id:"1"}, {header:"A"}, {id:"2"}, {id:"3"} ])
    })


})