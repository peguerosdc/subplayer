import React from 'react'
import { shallow } from 'enzyme'
import {ArtistResult} from "./ArtistResult"

describe("<ArtistResult />", () => {

    it("renders without crashing", () => {
    	const artist = {id : "a1", name : "artist"}
        shallow( <ArtistResult artist={artist} /> )
    })

})