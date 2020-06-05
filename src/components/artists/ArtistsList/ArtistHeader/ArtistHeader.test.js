import React from 'react'
import { shallow } from 'enzyme'
import ArtistHeader from "./ArtistHeader"

describe("<ArtistHeader />", () => {

    it("renders without crashing", () => {
        shallow( <ArtistHeader /> )
    })

    it("should load a title with the header", () => {
        const wrapper = shallow( <ArtistHeader name="my test" /> )
        expect( wrapper.find("#title").text() ).toEqual("my test")
    })

})