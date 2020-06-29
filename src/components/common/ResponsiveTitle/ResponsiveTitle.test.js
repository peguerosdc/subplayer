import React from 'react'
import { shallow } from 'enzyme'
import ResponsiveTitle from "./ResponsiveTitle"

describe("<ResponsiveTitle />", () => {

    it("renders without crashing", () => {
        shallow( <ResponsiveTitle /> )
    })

})