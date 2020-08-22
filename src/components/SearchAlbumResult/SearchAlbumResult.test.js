import React from 'react'
import { shallow } from 'enzyme'
import SearchAlbumResult from "./SearchAlbumResult"

describe("<SearchAlbumResult />", () => {

    it("renders without crashing", () => {
    	const album = {id : "a1", name : "Album", artist : "Artist"}
        shallow( <SearchAlbumResult album={album} /> )
    })

    it("renders an indicator for starred albums without crashing", () => {
    	const album = {id : "a1", name : "Album", artist : "Artist", starred:true}
        shallow( <SearchAlbumResult album={album} /> )
    })

    it("shows the year of the album", () => {
    	const album = {id : "a1", name : "Album", artist : "Artist", year:"2020"}
        const wrapper = shallow( <SearchAlbumResult album={album} showYear={true} /> )
        expect(wrapper.find("[data-key='description']").text().includes(album.year)).toBeTruthy()
    })

})