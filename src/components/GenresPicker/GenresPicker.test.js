import React from 'react'
import { shallow } from 'enzyme'
import GenresPicker from "./GenresPicker"

describe("<GenresPicker />", () => {

    it("renders without crashing", () => {
        shallow( <GenresPicker /> )
    })

    it("notifies when a genre changes", () => {
        const onGenreChanged = jest.fn()
        const wrapper = shallow( <GenresPicker onGenreChanged={onGenreChanged} /> )
        // change the genre
        wrapper.find("#genrePicker").simulate("change", "genre")
        expect(onGenreChanged).toHaveBeenCalledWith("genre")
    })

})