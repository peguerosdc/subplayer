import React from 'react'
import { shallow } from 'enzyme'
import { ArtistsList } from "./ArtistsList"

const props = {
    artists : ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
        .map(i => {
            return {
                name:i,
                artist : [1,2,3,4,5].map(n => {
                    return { id : i+n, name : n }
                }) 
            }
        })
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