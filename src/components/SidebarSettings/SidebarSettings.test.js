import React from 'react'
import { shallow } from 'enzyme'
import SidebarSettings from "./SidebarSettings"

describe("<SidebarSettings />", () => {

    it("renders without crashing", () => {
        shallow( <SidebarSettings /> )
    })

    it("should change the settings of the sidebar", () => {
        const loadSongsOfGenre = jest.fn()
        const wrapper = shallow( <SidebarSettings /> )
        // change the values and expect no crash
        wrapper.find("[name='genresCheckboxList']").simulate("change", [])
    })

})