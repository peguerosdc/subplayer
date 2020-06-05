import React from 'react'
import { shallow } from 'enzyme'
import ArtistLoader from "./ArtistLoader"

describe("<ArtistLoader />", () => {

    it("renders without crashing", () => {
        shallow( <ArtistLoader /> )
    })

})