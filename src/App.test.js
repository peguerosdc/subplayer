import React from 'react'
import { shallow } from 'enzyme'
import {App} from "./App"

describe("<App />", () => {

    it("renders without crashing", () => {
        shallow( <App loadPlaylists={() => null} logout={() => null} /> )
    })

    it("starts loading the list of playlists to display when mounted", () => {
        const loadPlaylists = jest.fn()
        const wrapper = shallow( <App loadPlaylists={loadPlaylists} logout={() => null} /> )
        expect(loadPlaylists).toHaveBeenCalledTimes(1)
    })

    it("shows a loader when async tasks are pending", () => {
        const wrapper = shallow( <App loadPlaylists={() => null} logout={() => null} asyncTasksInProgress={5} /> )
        expect(wrapper.find("#loader").prop("isLoading")).toBeTruthy()
    })

    it("should log out the user when selected from the navbar", () => {
        const logout = jest.fn()
        const wrapper = shallow( <App loadPlaylists={() => null} logout={logout} /> )
        wrapper.find("#mobileNavbar").simulate("logOut")
        expect(logout).toHaveBeenCalledTimes(1)
    })

    it("should log out the user when selected from the sidebar", () => {
        const logout = jest.fn()
        const wrapper = shallow( <App loadPlaylists={() => null} logout={logout} /> )
        wrapper.find("#sidebar").simulate("logOut")
        expect(logout).toHaveBeenCalledTimes(1)
    })

    it("should show the playlist creation modal when selected from the navbar", () => {
        const wrapper = shallow( <App loadPlaylists={() => null} logout={() => null} /> )
        wrapper.find("#mobileNavbar").simulate("createPlaylistTrigger")
        expect(wrapper.find("#createPlaylistModal").prop("showModal")).toBeTruthy()
    })

    it("should show the playlist creation modal when selected from the side bar", () => {
        const wrapper = shallow( <App loadPlaylists={() => null} logout={() => null} /> )
        wrapper.find("#sidebar").simulate("createPlaylistTrigger")
        expect(wrapper.find("#createPlaylistModal").prop("showModal")).toBeTruthy()
    })

    it("should hide the playlist creation modal when commanded", () => {
        const wrapper = shallow( <App loadPlaylists={() => null} logout={() => null} /> )
        // First, show the modal
        wrapper.find("#sidebar").simulate("createPlaylistTrigger")
        // Now, close it
        wrapper.find("#createPlaylistModal").simulate("closePlaylistModal")
        expect(wrapper.find("#createPlaylistModal").prop("showModal")).toBeFalsy()
    })


})