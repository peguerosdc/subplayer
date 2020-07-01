import React from 'react'
import { shallow } from 'enzyme'
import Artist from "./Artist"

const props = {
    artist : {
        album: ["album1", "album2"],
        albumCount: 2,
        id: "b44b14b2-0bfb-4a45-a36a-5a063568dddc",
        name: "Alabama Shakes",
    },
    artistId : "b44b14b2-0bfb-4a45-a36a-5a063568dddc",
    loadOneArtist : () => null
}

describe("<Artist />", () => {

    it("renders without crashing", () => {
        shallow( <Artist {...props} /> )
    })

    it("should load the artist's data when mounting", () => {
        const loadOneArtist = jest.fn()
        const enzymeWrapper = shallow( <Artist {...props} loadOneArtist={loadOneArtist} /> )
        expect(loadOneArtist).toHaveBeenCalled()
    })

    it("should show the ArtistAllSongs view when choosing to display all songs", () => {
        const enzymeWrapper = shallow( <Artist {...props} /> )
        // Simulate it was chosen to display all the songs in one view
        enzymeWrapper.find("#viewSelector").simulate("select", Artist.KEY_ALL_SONGS)
        // Look for the View displayed
        const view = enzymeWrapper.find("Connect(ArtistAllSongs)")
        expect( view ).toHaveLength(1)
        expect( view.prop("artistId") ).toEqual(props.artist.id)
    })

    it("should show the ArtistByAlbums view when choosing to display songs by album", () => {
        const enzymeWrapper = shallow( <Artist {...props} /> )
        // Simulate it was chosen to display songs by album in one view
        enzymeWrapper.find("#viewSelector").simulate("select", Artist.KEY_BY_ALBUM)
        // Look for the View displayed
        const view = enzymeWrapper.find("Connect(ArtistByAlbums)")
        expect( view ).toHaveLength(1)
        expect( view.prop("artistId") ).toEqual(props.artist.id)
    })


})