import React from 'react'
import { shallow } from 'enzyme'
import { ArtistByAlbums } from "./ArtistByAlbums"

const props = {
    albums : [
        {
            artist: "Arctic Monkeys",
            artistId: "be9da6bf-32f1-459e-a00f-518e70c9fcbe",
            coverArt: "de18b3b9-9a3c-45f6-ac6b-a04f50dd0fc4",
            created: "2010-04-09T05:26:56",
            duration: 2456,
            id: "b96e45a4-b665-4e81-9138-454274cda106",
            name: "Whatever People Say I Am, That",
            song: ["song1", "song2"],
            songCount: 2,
        },
        {
            artist: "Arctic Monkeys",
            artistId: "be9da6bf-32f1-459e-a00f-518e70c9fcbe",
            coverArt: "8b7eb6ef-db1c-4240-bf09-fa57aeef16fa",
            created: "2010-04-09T05:32:06",
            duration: 2254,
            id: "bbbff36f-dfc9-401b-9b46-883c80d6ea82",
            name: "Favourite Worst Nightmare",
            song: ["song3"],
            songCount: 1,
        }
    ]
}

describe("<ArtistByAlbums />", () => {

    it("renders without crashing", () => {
        shallow( <ArtistByAlbums /> )
    })

    it("should show a Select for small displays to pick an album", () => {
        const enzymeWrapper = shallow( <ArtistByAlbums {...props} /> )
        const albumsSelectData = props.albums.map(album => ({ value : album.id, label : album.name }))
        expect( enzymeWrapper.find("withLocale(DefaultPropsComponent)").prop("data") ).toEqual(albumsSelectData)
    })

    it("should show NavItems for large displays to pick an album", () => {
        const enzymeWrapper = shallow( <ArtistByAlbums {...props} /> )
        // There should be a NavItem per album
        expect( enzymeWrapper.find("NavItem").filter(`[eventKey='${props.albums[0].id}']`) ).toHaveLength(1)
        expect( enzymeWrapper.find("NavItem").filter(`[eventKey='${props.albums[1].id}']`) ).toHaveLength(1)
    })

    it("should show the correct album when selected an album on small displays", () => {
        const enzymeWrapper = shallow( <ArtistByAlbums {...props} /> )
        // Simulate an album was selected
        const albumId = props.albums[0].id
        enzymeWrapper.find("withLocale(DefaultPropsComponent)").simulate("change", albumId)
        // Look for the Album displayed
        expect( enzymeWrapper.find("Connect(Album)").prop("albumId") ).toEqual(albumId)
    })

    it("should show the correct album when selected an album on large displays", () => {
        const enzymeWrapper = shallow( <ArtistByAlbums {...props} /> )
        // Simulate an album was selected
        const albumId = props.albums[0].id
        enzymeWrapper.find(".nav-artist-by-albums").simulate("select", albumId)
        // Look for the Album displayed
        expect( enzymeWrapper.find("Connect(Album)").prop("albumId") ).toEqual(albumId)
    })

})