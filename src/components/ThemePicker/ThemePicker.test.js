import React from 'react'
import { shallow } from 'enzyme'
import ThemePicker from "./ThemePicker"

describe("<ThemePicker />", () => {

    it("renders without crashing", () => {
        shallow( <ThemePicker /> )
    })

    it("should show a list of themes", () => {
    	const themes = { "lightOrange" : {"base-color" : "#fff"}, "darkBlue" : {}, "black" : {} }
        const wrapper = shallow( <ThemePicker themes={themes} /> )
        // Look for themes
        expect(wrapper.find("[data-theme-name='lightOrange']").text()).toBe("Light orange")
        expect(wrapper.find("[data-theme-name='darkBlue']").text()).toBe("Dark blue")
        expect(wrapper.find("[data-theme-name='black']").text()).toBe("black")
    })

})