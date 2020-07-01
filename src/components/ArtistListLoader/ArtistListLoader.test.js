import React from 'react'
import { shallow } from 'enzyme'
import ArtistListLoader from "./ArtistListLoader"

describe("<ArtistListLoader />", () => {

    it("renders without crashing", () => {
        shallow( <ArtistListLoader /> )
    })

})