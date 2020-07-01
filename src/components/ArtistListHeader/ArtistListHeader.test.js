import React from 'react'
import { shallow } from 'enzyme'
import ArtistListHeader from "./ArtistListHeader"

describe("<ArtistListHeader />", () => {

    it("renders without crashing", () => {
        shallow( <ArtistListHeader /> )
    })

    it("should load a title with the header", () => {
        const wrapper = shallow( <ArtistListHeader name="my test" /> )
        expect( wrapper.find("#title").text() ).toEqual("my test")
    })

})