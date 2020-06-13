import React from 'react'
import { shallow } from 'enzyme'
import {PlaylistSelectorDropdown} from "./PlaylistSelectorDropdown"

describe("<PlaylistSelectorDropdown />", () => {

    it("renders without crashing", () => {
        shallow( <PlaylistSelectorDropdown /> )
    })

    it("should show the favourites option on demand", () => {
        const wrapper = shallow( <PlaylistSelectorDropdown showFavourites={true} /> )
        expect(wrapper.find("#favourites_item")).toHaveLength(1)
    })

    it("should not show the favourites option on demand", () => {
        const wrapper = shallow( <PlaylistSelectorDropdown showFavourites={false} /> )
        expect(wrapper.find("#favourites_item")).toHaveLength(0)
    })

    it("should show the queue option on demand", () => {
        const wrapper = shallow( <PlaylistSelectorDropdown showQueue={true} /> )
        expect(wrapper.find("#queue_item")).toHaveLength(1)
    })

    it("should not show the queue option on demand", () => {
        const wrapper = shallow( <PlaylistSelectorDropdown showQueue={false} /> )
        expect(wrapper.find("#queue_item")).toHaveLength(0)
    })

    it("should show your playlists in the dropdown", () => {
        // The third playlist is not mine, so I can't add songs to it and it should not show n the list
        const playlists = {
            "1" : {
                id : "1",
                name : "name 1",
                isMine : true
            },
            "2" : {
                id : "2",
                name : "name 2",
                isMine : true
            },
            "3" : {
                id : "3",
                name : "name 3",
                isMine : false
            },
        }
        const wrapper = shallow( <PlaylistSelectorDropdown showQueue={false} showFavourites={false} playlists={playlists} /> )
        expect(wrapper.find("DropdownMenuItem")).toHaveLength(2)
    })

    it("should select a playlist when its option is selected", () => {
        const playlists = {
            "1" : {
                id : "1",
                name : "name 1",
                isMine : true
            },
            "2" : {
                id : "2",
                name : "name 2",
                isMine : true
            }
        }
        const onPlaylistSelected = jest.fn()
        const wrapper = shallow( <PlaylistSelectorDropdown showFavourites={false} playlists={playlists} onPlaylistSelected={onPlaylistSelected} /> )
        // Select playlist 1
        wrapper.find("Dropdown").simulate("select", "1")
        expect(onPlaylistSelected).toHaveBeenCalledTimes(1)
        expect(onPlaylistSelected).toHaveBeenCalledWith(playlists["1"])
    })

    it("should select favourites when its option is selected", () => {
        const playlists = {
            "1" : {
                id : "1",
                name : "name 1",
                isMine : true
            },
            "2" : {
                id : "2",
                name : "name 2",
                isMine : true
            }
        }
        const onFavouritesSelected = jest.fn()
        const wrapper = shallow( <PlaylistSelectorDropdown showFavourites={true} playlists={playlists} onFavouritesSelected={onFavouritesSelected} /> )
        // Select "favourites option"
        const favsEventKey = wrapper.find("#favourites_item").prop("eventKey")
        wrapper.find("Dropdown").simulate("select", favsEventKey)
        expect(onFavouritesSelected).toHaveBeenCalledTimes(1)
    })

    it("should select playing queue when its option is selected", () => {
        const playlists = {
            "1" : {
                id : "1",
                name : "name 1",
                isMine : true
            },
            "2" : {
                id : "2",
                name : "name 2",
                isMine : true
            }
        }
        const onQueueSelected = jest.fn()
        const wrapper = shallow( <PlaylistSelectorDropdown showQueue={true} playlists={playlists} onQueueSelected={onQueueSelected} /> )
        // Select "queue option"
        const thisEventKey = wrapper.find("#queue_item").prop("eventKey")
        wrapper.find("Dropdown").simulate("select", thisEventKey)
        expect(onQueueSelected).toHaveBeenCalledTimes(1)
    })

})