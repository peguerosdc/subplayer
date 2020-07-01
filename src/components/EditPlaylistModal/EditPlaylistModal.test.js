import React from 'react'
import { shallow } from 'enzyme'
import EditPlaylistModal from "./EditPlaylistModal"

describe("<EditPlaylistModal />", () => {

	const playlist = {
		"id" : "my_id",
        "name" : "my playlist",
        "comment" : "this is a comment",
        "isPublic" : true
    }

    it("renders without crashing", () => {
        shallow( <EditPlaylistModal playlistId={"id"} editPlaylist={() => null}/> )
    })

    it("should let me edit a playlist", () => {
        const editPlaylist = jest.fn()
        const wrapper = shallow( <EditPlaylistModal playlistId={"id"} playlist={playlist} editPlaylist={editPlaylist}/> )
        // Try to edit the playlist
        wrapper.find("#name").simulate("change", "new name")
        wrapper.find("#comment").simulate("change", "new comment")
        wrapper.find("#isPublic").simulate("change", null, false)
        wrapper.find("#editButton").simulate("click")
        // Playlist should be edited
        expect(editPlaylist).toHaveBeenCalledWith("my_id", "new name", "new comment", false)
    })

    it("should not let me edit a playlist without a name", () => {
        const editPlaylist = jest.fn()
        const wrapper = shallow( <EditPlaylistModal playlistId={"id"} playlist={playlist} editPlaylist={editPlaylist}/> )
        // Try to edit the playlist
        wrapper.find("#name").simulate("change", "")
        wrapper.find("#editButton").simulate("click")
        // Playlist should not be edited and an error message should be displayed
        expect(wrapper.find("#nameErrorMessage").exists()).toBeTruthy()
        expect(editPlaylist).toHaveBeenCalledTimes(0)
    })


    it("should let me cancel the edition", () => {
        const editPlaylist = jest.fn()
        const wrapper = shallow( <EditPlaylistModal playlistId={"id"} playlist={playlist} editPlaylist={editPlaylist}/> )
        // Try to cancel the operation
        wrapper.find("#cancelButton").simulate("click")
        // The edition should not be triggered
        expect(editPlaylist).toHaveBeenCalledTimes(0)
    })

})