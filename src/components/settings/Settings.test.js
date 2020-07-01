import React from 'react'
import { shallow } from 'enzyme'
import {Settings} from "./Settings"

describe("<Settings />", () => {

    it("renders without crashing", () => {
        shallow( <Settings logout={() => null} /> )
    })

    it("should provide theme settings", () => {
        const wrapper = shallow( <Settings logout={() => null} /> )
        expect(wrapper.find("ThemePicker").exists()).toBeTruthy()
    })

    it("should let me log out", () => {
    	const logout = jest.fn()
        const wrapper = shallow( <Settings logout={logout} /> )
        wrapper.find("#logoutButton").simulate("click")
        expect(logout).toHaveBeenCalledTimes(1)
    })

})