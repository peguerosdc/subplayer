import React from 'react'
import { shallow } from 'enzyme'
import {NavigationButtons} from "./AlbumsList"

describe("<NavigationButtons />", () => {

    it("renders without crashing", () => {
        shallow( <NavigationButtons />)
    })

})