import React from 'react'
import { shallow } from 'enzyme'
import SettingsView from "./SettingsView"

describe("<SettingsView />", () => {

    it("renders without crashing", () => {
        shallow( <SettingsView logout={() => null} /> )
    })
    
    it("should let me log out", () => {
    	const logout = jest.fn()
        const wrapper = shallow( <SettingsView logout={logout} /> )
        wrapper.find("#logoutButton").simulate("click")
        expect(logout).toHaveBeenCalledTimes(1)
    })

})