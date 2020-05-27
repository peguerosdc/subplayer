import React from 'react'
import { shallow } from 'enzyme'
import {MyNavbar} from "./Navbar"

describe("<MyNavbar />", () => {

    it("renders without crashing", () => {
        shallow( <MyNavbar /> )
    })

    it("renders the playlists with their amount of songs", () => {
    	const playlists = {
    		"id1" : { name : "one", songCount : 20},
    		"id2" : { name : "two", songCount : 132},
    	}
        const wrapper = shallow( <MyNavbar playlists={playlists} /> )
        // check there are the 2 playlists + create
        expect(wrapper.find("#playlists").children()).toHaveLength(3)
    })

    // TODO: couldn't find a way to test the contents of each playlist item to check if they are rendered correctly

    // TODO: couldn't find a way to test the nav items as component.simulate('click') doesn't trigger anything

})