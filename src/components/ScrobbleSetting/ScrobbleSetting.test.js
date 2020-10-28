import React from 'react';
import { shallow } from 'enzyme'
import {ScrobbleSetting} from "./ScrobbleSetting"

describe("<ScrobbleSetting />", () => {

    it("renders without crashing", () => {
        shallow( <ScrobbleSetting />)
    })

})