import React from 'react'
import { shallow } from 'enzyme'
import DeletePlaylistModal from "./DeletePlaylistModal"

describe("<DeletePlaylistModal />", () => {

	const playlist = {
		"id" : "my_id",
        "name" : "my playlist",
        "owner" : "the owner",
        "songCount" : 24,
        "duration" : 729,
        "comment" : "this is a comment"
    }

    it("renders without crashing", () => {
        shallow( <DeletePlaylistModal playlistId={"id"} deletePlaylist={() => null}/> )
    })

    it("should let me delete a playlist", () => {
        const deletePlaylist = jest.fn()
        const wrapper = shallow( <DeletePlaylistModal playlistId={"id"} playlist={playlist} deletePlaylist={deletePlaylist}/> )
        // Try to delete the playlist
        wrapper.find("#confirm_name").simulate("change", "my playlist")
        wrapper.find("#deleteButton").simulate("click")
        // Playlist should be deleted
        expect(wrapper.find("#errorMessage").exists()).toBeFalsy()
        expect(deletePlaylist).toHaveBeenCalledTimes(1)
    })

    it("should not let me delete a playlist without confirmation", () => {
        const deletePlaylist = jest.fn()
        const wrapper = shallow( <DeletePlaylistModal playlistId={"id"} playlist={playlist} deletePlaylist={deletePlaylist}/> )
        // Try to delete the playlist without confirmation
        wrapper.find("#deleteButton").simulate("click")
        // Playlist should not be deleted and an error message should be displayed
        expect(wrapper.find("#errorMessage").exists()).toBeTruthy()
        expect(deletePlaylist).toHaveBeenCalledTimes(0)
    })

    it("should let me cancel the deletion", () => {
        const deletePlaylist = jest.fn()
        const wrapper = shallow( <DeletePlaylistModal playlistId={"id"} playlist={playlist} deletePlaylist={deletePlaylist}/> )
        // Try to cancel the operation
        wrapper.find("#cancelButton").simulate("click")
        // The deletion should not be triggered
        expect(deletePlaylist).toHaveBeenCalledTimes(0)
    })

})