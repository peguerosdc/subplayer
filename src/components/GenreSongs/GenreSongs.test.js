import React from 'react'
import { shallow } from 'enzyme'
import GenreSongs from "./GenreSongs"

describe("<GenreSongs />", () => {

    it("renders without crashing", () => {
        shallow( <GenreSongs /> )
    })

    it("should load songs when a genre is selected", () => {
        const loadSongsOfGenre = jest.fn()
        const wrapper = shallow( <GenreSongs genre={null} loadSongsOfGenre={loadSongsOfGenre} /> )
        const genre = {value:"blues"}
        // change the genre
        wrapper.setProps({genre})
        expect(loadSongsOfGenre).toHaveBeenCalledWith(genre)
    })

})