import React from 'react'
import { shallow } from 'enzyme'
import { CreatePlaylistModal } from "./CreatePlaylistModal"


describe("<CreatePlaylistModal />", () => {

    it("renders without crashing", () => {
        shallow( <CreatePlaylistModal /> )
    })

    it("should not show the modal when not wanted", () => {
        const wrapper = shallow( <CreatePlaylistModal showModal={false} /> )
        expect(wrapper.find("#modal").prop("show")).toBe(false)
    })

    it("should show the modal when wanted", () => {
        const wrapper = shallow( <CreatePlaylistModal showModal={true} /> )
        expect(wrapper.find("#modal").prop("show")).toBe(true)
    })

    it("should show error messages when playlist form is invalid", () => {
        // Mock playlist creation function
        const createPlaylist = jest.fn()
        // Mount
        const wrapper = shallow( <CreatePlaylistModal showModal={true} createPlaylist={createPlaylist} /> )
        wrapper.find("#create_playlist").simulate("click")
        // Test form is not submitted and error messages are shown
        expect( createPlaylist ).toHaveBeenCalledTimes(0)
        expect(typeof wrapper.find("[name='name']").prop("errorMessage")).toBe("string")
    })

    it("should trigger playlist creation when form is valid", () => {
        // Mock playlist creation and modal reaction function
        const createPlaylist = jest.fn()
        const onClosePlaylistModal = jest.fn()
        // Mount
        const wrapper = shallow( <CreatePlaylistModal showModal={true} createPlaylist={createPlaylist} onClosePlaylistModal={onClosePlaylistModal} /> )
        wrapper.find("Form").simulate("change", {
            name : "name"
        })
        wrapper.find("#create_playlist").simulate("click")
        // Test form is submitted and modal is hidden
        expect( createPlaylist ).toHaveBeenCalledTimes(1)
        expect( onClosePlaylistModal ).toHaveBeenCalledTimes(1)
    })

    it("should close the modal on close button clicked", () => {
        const createPlaylist = jest.fn()
        const onClosePlaylistModal = jest.fn()
        const wrapper = shallow( <CreatePlaylistModal showModal={true} createPlaylist={createPlaylist} onClosePlaylistModal={onClosePlaylistModal} /> )
        wrapper.find("#close").simulate("click")
        expect( onClosePlaylistModal ).toHaveBeenCalledTimes(1)
        expect( createPlaylist ).toHaveBeenCalledTimes(0)
    })

})