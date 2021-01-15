import React from 'react'
import { shallow } from 'enzyme'
import GenresView from "./GenresView"

describe("<GenresView />", () => {

    it("renders without crashing", () => {
        shallow( <GenresView /> )
    })

})