import React from 'react'
import { shallow } from 'enzyme'
import SearchSongResult from "./SearchSongResult"

describe("<SearchSongResult />", () => {

    it("renders without crashing", () => {
    	const songs = [{id : 1}]
        shallow( <SearchSongResult songs={songs} /> )
    })

})