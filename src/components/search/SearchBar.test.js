import React from 'react'
import { shallow } from 'enzyme'
import {SearchBar} from "./SearchBar"

describe("<SearchBar />", () => {

    it("renders without crashing", () => {
        shallow( <SearchBar onSearch={() => null} /> )
    })

    it("should let me perform a search", () => {
        const onSearch = jest.fn()
        const wrapper = shallow( <SearchBar onSearch={onSearch}/> )
        // Try to query something
        wrapper.find("#queryBar").simulate("change", "my query")
        wrapper.find("#searchButton").simulate("click")
        // Check that the search function is called
        expect(onSearch).toHaveBeenCalledWith("my query")
    })

})