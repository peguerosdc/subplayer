import React from 'react'
import { shallow } from 'enzyme'
import { ArtistElement } from "./ArtistElement"

const currentSongPlaying = {
    artistId : "myid"
}

const artist = {
    id : "myid",
    name : "my name"
}

describe("<ArtistElement />", () => {

    it("renders without crashing", () => {
        shallow( <ArtistElement /> )
    })

    it("should render the specified artist correctly", () => {
        const wrapper = shallow( <ArtistElement artist={artist} /> )
        const artists = wrapper.find("#name")
        expect(wrapper.find("#name").html()).toContain( "my name" )
    })

    it("should contain an indicator of the artist currently playing", () => {
        const wrapper = shallow( <ArtistElement artist={artist} currentSongPlaying={currentSongPlaying} /> )
        expect(wrapper.find("#name.playing").html()).toContain( "my name" )
        // Change the currently playing artist and expect the class "playing" to not be present
        wrapper.setProps({currentSongPlaying : {artistId : "2"} })
        expect(wrapper.find("#name.playing").exists()).toBeFalsy()
    })

})