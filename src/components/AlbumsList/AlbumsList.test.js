import React from 'react';
import { shallow } from 'enzyme'
import {AlbumsList} from "./AlbumsList"

describe("<AlbumsList />", () => {

    it("renders without crashing and loads albums", () => {
    	const loadAlbums = jest.fn()
        shallow( <AlbumsList loadAlbums={loadAlbums}/> )
        expect(loadAlbums).toHaveBeenCalledTimes(1)
    })

    it("renders a list of albums without crashing", () => {
    	const albums = [{id:1}, {id:2}]
        shallow( <AlbumsList loadAlbums={() => null} albums={[]} /> )
    })

    it("re-loads albums when a filter changes", () => {
    	const loadAlbums = jest.fn()
    	const filter = "new filter"
        const wrapper = shallow( <AlbumsList loadAlbums={loadAlbums} /> )
        wrapper.find("#albumsFilter").simulate("filterChanged", {filter})
        expect(loadAlbums).toHaveBeenLastCalledWith(filter, {}, 0)
    })

    it("loads albums when the next page is clicked (both for MD and mobile screens)", () => {
    	const loadAlbums = jest.fn()
    	const filter = "new filter"
        const wrapper = shallow( <AlbumsList loadAlbums={loadAlbums} /> )
        wrapper.find("#pageNavigation").simulate("next")
        wrapper.find("#pageNavigationMobile").simulate("next")
        // 3 times: 1 on first render, and other 2 when clicking both "next"s
        expect(loadAlbums).toHaveBeenCalledTimes(3)
    })

    it("loads albums when the previous page is clicked (both for MD and mobile screens)", () => {
    	const loadAlbums = jest.fn()
    	const filter = "new filter"
        const wrapper = shallow( <AlbumsList loadAlbums={loadAlbums} /> )
        wrapper.find("#pageNavigation").simulate("previous")
        wrapper.find("#pageNavigationMobile").simulate("previous")
        // 3 times: 1 on first render, and other 2 when clicking both "next"s
        expect(loadAlbums).toHaveBeenCalledTimes(3)
    })

})