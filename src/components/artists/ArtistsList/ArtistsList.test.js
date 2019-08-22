import React from 'react'
import { shallow } from 'enzyme'
import { ArtistsList } from "./ArtistsList"

const props = {
    artists : [
        {
            name : "A",
            artist : [
                {
                    id : "1",
                    name : "an artist 1"
                },
                {
                    id : "2",
                    name : "an artist 2"
                }
            ]
        },
        {
            name : "B",
            artist : [
                {
                    id : "3",
                    name : "an artist 3"
                },
                {
                    id : "4",
                    name : "an artist 4"
                }
            ]
        }
    ]
}

describe("<ArtistsList />", () => {

    it("renders without crashing", () => {
        shallow( <ArtistsList /> )
    })

    it("should load the artists if there are not loaded", () => {
        const loadArtists = jest.fn()
        shallow( <ArtistsList loadArtists={loadArtists} /> )
        expect( loadArtists ).toHaveBeenCalled()
    })

    it("should take the artists from cache if they are already loaded", () => {
        const loadArtists = jest.fn()
        shallow( <ArtistsList {...props} loadArtists={loadArtists} /> )
        expect( loadArtists ).toHaveBeenCalledTimes(0)
    })

    it("should contain an infinite scroll to load all the artists", () => {
        const enzymeWrapper = shallow( <ArtistsList {...props} /> )
        expect( enzymeWrapper.find("InfiniteScroll")).toHaveLength(1)
    })

})