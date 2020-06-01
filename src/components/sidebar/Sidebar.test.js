import React from 'react'
import { shallow } from 'enzyme'
import {Sidebar} from "./Sidebar"

describe("<Sidebar />", () => {
    const playlists = {
        "p1" : {
            name : "name",
            songCount : 10
        },
        "p2" : {
            name : "name 2",
            songCount : 14
        }
    }

    it("renders without crashing", () => {
        shallow( <Sidebar /> )
    })

    it("should render a list of playlists", () => {
        const wrapper = shallow( <Sidebar playlists={playlists} /> )
        // Get playlists visible
        expect(wrapper.find(".playlist-item")).toHaveLength(2)
    })

    it("should let me create new playlists", () => {
        const onCreatePlaylistTrigger = jest.fn()
        const wrapper = shallow( <Sidebar onCreatePlaylistTrigger={onCreatePlaylistTrigger}/> )
        // Try to create playlist
        wrapper.find("#createPlaylistButton").simulate('click')
        expect(onCreatePlaylistTrigger).toHaveBeenCalledTimes(1)
    })

    it("should let me log out", () => {
        const onLogOut = jest.fn()
        const wrapper = shallow( <Sidebar onLogOut={onLogOut}/> )
        // Try to log out
        wrapper.find("#logoutButton").simulate('click')
        expect(onLogOut).toHaveBeenCalledTimes(1)
    })

})