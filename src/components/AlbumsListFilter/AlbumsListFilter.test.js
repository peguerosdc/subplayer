import React from 'react'
import { shallow } from 'enzyme'
import AlbumsListFilter from "./AlbumsListFilter"

describe("<AlbumsListFilter />", () => {

    it("renders without crashing", () => {
        shallow( <AlbumsListFilter /> )
    })

    it("notifies when a basic filter is choosed", () => {
        const onFilterChanged = jest.fn()
        const filter = "newest"
        const wrapper = shallow( <AlbumsListFilter onFilterChanged={onFilterChanged} /> )
        wrapper.find("#filterSelection").simulate("change", filter)
        expect(onFilterChanged).toHaveBeenCalledWith({filter: filter})
    })

    it("notifies when a genre is selected", () => {
        const onFilterChanged = jest.fn()
        const filter = "byGenre"
        const wrapper = shallow( <AlbumsListFilter onFilterChanged={onFilterChanged} /> )
        wrapper.find("#filterSelection").simulate("change", filter)
        wrapper.find("#genrePicker").simulate("change","blues")
        expect(onFilterChanged).toHaveBeenCalledWith({filter: filter, genre:"blues"})
    })

    it("should only notify if a genre is set", () => {
        const onFilterChanged = jest.fn()
        const filter = "byGenre"
        const wrapper = shallow( <AlbumsListFilter onFilterChanged={onFilterChanged} /> )
        wrapper.find("#filterSelection").simulate("change", filter)
        wrapper.find("#genrePicker").simulate("change", null)
        expect(onFilterChanged).toHaveBeenCalledTimes(0)
    })

    it("notifies when the filter is set by year", () => {
        const onFilterChanged = jest.fn()
        const filter = "byYear"
        const wrapper = shallow( <AlbumsListFilter onFilterChanged={onFilterChanged} /> )
        wrapper.find("#filterSelection").simulate("change", filter)
        wrapper.find("#yearFrom").simulate("change","1990")
        wrapper.find("#yearTo").simulate("change","1995")
        wrapper.find("#yearSearch").simulate("click")
        expect(onFilterChanged).toHaveBeenCalledWith({filter: filter, from:"1990", to:"1995"})
    })

    it("should only notify if both years are set", () => {
        const onFilterChanged = jest.fn()
        const filter = "byYear"
        const wrapper = shallow( <AlbumsListFilter onFilterChanged={onFilterChanged} /> )
        wrapper.find("#filterSelection").simulate("change", filter)
        wrapper.find("#yearFrom").simulate("change","1990")
        wrapper.find("#yearSearch").simulate("click")
        expect(onFilterChanged).toHaveBeenCalledTimes(0)
    })

})