import React from 'react'
import { shallow } from 'enzyme'
import { CreatePlaylistModal } from "./CreatePlaylistModal"


describe("<CreatePlaylistModal />", () => {

    it("renders without crashing", () => {
        shallow( <CreatePlaylistModal /> )
    })

    it("should not show the modal when not wanted", () => {
        const enzymeWrapper = shallow( <CreatePlaylistModal showModal={false} /> )
        expect(enzymeWrapper.find("Modal").prop("show")).toBe(false)
    })

    it("should show the modal when wanted", () => {
        const enzymeWrapper = shallow( <CreatePlaylistModal showModal={true} /> )
        expect(enzymeWrapper.find("Modal").prop("show")).toBe(true)
    })

    it("should show error messages when playlist form is invalid", () => {
        // Mock playlist creation function
        const createPlaylist = jest.fn()
        // Mount
        const enzymeWrapper = shallow( <CreatePlaylistModal showModal={true} createPlaylist={createPlaylist} /> )
        enzymeWrapper.find("#create_playlist").simulate("click")
        // Test form is not submitted and error messages are shown
        expect( createPlaylist ).toHaveBeenCalledTimes(0)
        expect(typeof enzymeWrapper.find("[name='name']").prop("errorMessage")).toBe("string")
    })

    it("should trigger playlist creation when form is valid", () => {
        // Mock playlist creation and modal reaction function
        const createPlaylist = jest.fn()
        const onClosePlaylistModal = jest.fn()
        // Mount
        const enzymeWrapper = shallow( <CreatePlaylistModal showModal={true} createPlaylist={createPlaylist} onClosePlaylistModal={onClosePlaylistModal} /> )
        enzymeWrapper.find("Form").simulate("change", {
            name : "name"
        })
        enzymeWrapper.find("#create_playlist").simulate("click")
        // Test form is submitted and modal is hidden
        expect( createPlaylist ).toHaveBeenCalledTimes(1)
        expect( onClosePlaylistModal ).toHaveBeenCalledTimes(1)
    })

    it("should close the modal on close button clicked", () => {
        const createPlaylist = jest.fn()
        const onClosePlaylistModal = jest.fn()
        const enzymeWrapper = shallow( <CreatePlaylistModal showModal={true} createPlaylist={createPlaylist} onClosePlaylistModal={onClosePlaylistModal} /> )
        enzymeWrapper.find("#close").simulate("click")
        expect( onClosePlaylistModal ).toHaveBeenCalledTimes(1)
        expect( createPlaylist ).toHaveBeenCalledTimes(0)
    })

})