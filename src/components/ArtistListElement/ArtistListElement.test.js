import React from 'react'
import { shallow } from 'enzyme'
import ArtistListElement from "./ArtistListElement"

const currentSongPlaying = {
    artistId : "myid"
}

const artist = {
    id : "myid",
    name : "my name"
}

describe("<ArtistListElement />", () => {

    it("renders without crashing", () => {
        shallow( <ArtistListElement /> )
    })

    it("should render the specified artist correctly", () => {
        const wrapper = shallow( <ArtistListElement artist={artist} /> )
        const artists = wrapper.find("#name")
        expect(wrapper.find("#name").html()).toContain( "my name" )
    })

    it("should contain an indicator of the artist currently playing", () => {
        const wrapper = shallow( <ArtistListElement artist={artist} currentSongPlaying={currentSongPlaying} /> )
        expect(wrapper.find("#name.currently-playing").html()).toContain( "my name" )
        // Change the currently playing artist and expect the class "playing" to not be present
        wrapper.setProps({currentSongPlaying : {artistId : "2"} })
        expect(wrapper.find("#name.currently-playing").exists()).toBeFalsy()
    })

})