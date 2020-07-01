import React from 'react'
import { shallow } from 'enzyme'
import SearchAlbumResult from "./SearchAlbumResult"

describe("<SearchAlbumResult />", () => {

    it("renders without crashing", () => {
    	const album = {id : "a1", name : "Album", artist : "Artist"}
        shallow( <SearchAlbumResult album={album} /> )
    })

})