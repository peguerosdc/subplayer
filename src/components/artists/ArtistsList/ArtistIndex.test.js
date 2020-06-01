import React from 'react'
import { shallow } from 'enzyme'
import { ArtistIndex } from "./ArtistIndex"

const props = {
    index : 0,
    indexObject : {
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
    currentSongPlaying : {
        artistId : "1"
    }
}

describe("<ArtistIndex />", () => {

    it("renders without crashing", () => {
        shallow( <ArtistIndex /> )
    })

    it("should contain the title of the index to display", () => {
        const enzymeWrapper = shallow( <ArtistIndex {...props} /> )
        expect( enzymeWrapper.find(".link_to_artist_header").text() ).toEqual(props.indexObject.name)
    })

    it("should contain items corresponding to the artists in the index", () => {
        const enzymeWrapper = shallow( <ArtistIndex {...props} /> )
        const artists = enzymeWrapper.find(".link_to_artist")
        expect(artists).toHaveLength(2)
        expect(artists.at(0).html()).toContain( props.indexObject.artist[0].name )
        expect(artists.at(1).html()).toContain( props.indexObject.artist[1].name )
    })

    it("should contain an indicator of the artist currently playing", () => {
        const enzymeWrapper = shallow( <ArtistIndex {...props} /> )
        expect(enzymeWrapper.find(".link_to_artist.playing").html()).toContain( props.indexObject.artist[0].name )
        // Change the currently playing artist and expect update
        enzymeWrapper.setProps({currentSongPlaying : {artistId : "2"} })
        expect(enzymeWrapper.find(".link_to_artist.playing").html()).toContain( props.indexObject.artist[1].name )
    })

})