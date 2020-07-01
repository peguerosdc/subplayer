import React from 'react'
import { shallow } from 'enzyme'
import Playlist from "./Playlist"

describe("<Playlist />", () => {

	const playlist = {
		"id" : "my_id",
        "name" : "my playlist",
        "owner" : "the owner",
        "songCount" : 24,
        "duration" : 729,
        "comment" : "this is a comment"
    }

    const songs = [
        { "id" : "1" }
    ]

    it("renders without crashing", () => {
        shallow( <Playlist /> )
    })

    it("should load the specified playlist", () => {
        const loadSinglePlaylist = jest.fn()
        shallow( <Playlist playlistId="id" loadSinglePlaylist={loadSinglePlaylist} /> )
        expect(loadSinglePlaylist).toHaveBeenCalledTimes(1)
    })

    it("should be able to switch between playlists", () => {
        const loadSinglePlaylist = jest.fn()
        // Load the component with one playlist
        const wrapper = shallow( <Playlist playlistId="id" loadSinglePlaylist={loadSinglePlaylist} /> )
        // Then switch it and expect it to reload with the new playlist
        wrapper.setProps({ playlistId: "newid"})
        expect(loadSinglePlaylist).toHaveBeenCalledTimes(2)
    })

    it("should render my playlist correctly", () => {
        const wrapper = shallow( <Playlist playlist={{...playlist, isMine : true}} songs={songs} /> )
        // Check details of playlist
        expect(wrapper.find("#title").exists()).toBeTruthy()
        expect(wrapper.find("#details").text()).toEqual("24 songs, 12 mins 9 s by the owner")
        expect(wrapper.find("#comment").text()).toEqual('"this is a comment"')
        // Check songs
        expect(wrapper.find("#songsComponent").prop("songs")).toEqual(songs)
    })

    it("should let me edit my playlists", () => {
        const wrapper = shallow( <Playlist playlist={{...playlist, isMine : true}} /> )
        // Try to edit this playlist
        wrapper.find("#editButton").simulate("click")
        expect(wrapper.find("#editComponent").prop("show")).toEqual(true)
    })

    it("should let me remove songs from my playlists", () => {
        const removeSongsFromPlaylist = jest.fn()
        const wrapper = shallow( <Playlist playlist={{...playlist, isMine : true}} songs={songs} removeSongsFromPlaylist={removeSongsFromPlaylist} /> )
        // The remove button should be disbaled until songs are selected
        wrapper.find("#removeButton").simulate("click")
        wrapper.setState({selectedSongs : songs})
        wrapper.find("#removeButton").simulate("click")
        // Try to remove this songs from the playlist.
        // As the on the first click the button was disabled, we just expect 1 call
        expect(removeSongsFromPlaylist).toHaveBeenCalledTimes(1)
    })

    it("should let me delete my playlists", () => {
        const wrapper = shallow( <Playlist playlist={{...playlist, isMine : true}} /> )
        // Try to delete this playlist
        wrapper.find("#deleteButton").simulate("click")
        expect(wrapper.find("#deleteComponent").prop("show")).toEqual(true)
    })

    it("should render others' playlist correctly", () => {
        const wrapper = shallow( <Playlist playlist={{...playlist, isMine : false}} songs={songs} /> )
        // Check details of playlist
        expect(wrapper.find("#title").exists()).toBeTruthy()
        expect(wrapper.find("#details").text()).toEqual("24 songs, 12 mins 9 s by the owner")
        expect(wrapper.find("#comment").text()).toEqual('"this is a comment"')
        // Check songs
        expect(wrapper.find("#songsComponent").prop("songs")).toEqual(songs)
    })

    it("should not let me edit others' playlists", () => {
        const wrapper = shallow( <Playlist playlist={{...playlist, isMine : false}} /> )
        // The edit button should not be even visible
        expect(wrapper.find("#editButton").exists()).toBeFalsy()
    })

    it("should not let me delete others' playlists", () => {
        const wrapper = shallow( <Playlist playlist={{...playlist, isMine : false}} /> )
        // The delete button should not be even visible
        expect(wrapper.find("#deleteButton").exists()).toBeFalsy()
    })

    it("should not let me remove songs from others' playlists", () => {
        const wrapper = shallow( <Playlist playlist={{...playlist, isMine : false}} songs={songs} /> )
        // The remove button should not be even visible
        expect(wrapper.find("#removeButton").exists()).toBeFalsy()
    })

})