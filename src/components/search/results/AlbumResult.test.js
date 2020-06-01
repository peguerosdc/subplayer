import React from 'react'
import { shallow } from 'enzyme'
import {AlbumResult} from "./AlbumResult"

describe("<AlbumResult />", () => {

    it("renders without crashing", () => {
    	const album = {id : "a1", name : "Album", artist : "Artist"}
        shallow( <AlbumResult album={album} /> )
    })

})