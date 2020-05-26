import React from 'react'
import { shallow } from 'enzyme'
import {SongsTableEnhanced} from "./SongsTableEnhanced"

describe("<SongsTableEnhanced />", () => {

    const songs = [...Array(500).keys()].map(i => {return {
        id : i.toString(),
        title: `song ${i}`,
        artist : `artist ${Math.random().toString(36).substring(7)}`,
        album : `album ${i}`
    }})

    it("renders without crashing", () => {
        shallow( <SongsTableEnhanced /> )
    })

    it("renders a list of songs without crashing", () => {
        const wrapper = shallow( <SongsTableEnhanced songs={songs} /> )
    })

    it("renders a list of songs to fill the available height without crashing", () => {
        const wrapper = shallow( <SongsTableEnhanced songs={songs} fixedHeightToFill={true} /> )
        expect(wrapper.find("#autosizerContainer").exists()).toBeTruthy()
    })

    it("should show the option to search songs on demand", () => {
        const wrapper = shallow( <SongsTableEnhanced songs={songs} withSearchFilter={false} /> )
        // Check that there is no search bar
        expect(wrapper.find("#searchBar").exists()).toBeFalsy()
    })

    it("should let me search for specific songs in the list", () => {
        const wrapper = shallow( <SongsTableEnhanced songs={songs} /> )
        // When a query is issued
        wrapper.find("#searchBar").simulate("search", "a query")
        // The songs table should be updated with this filter
        expect(wrapper.find("#songsTable").prop("songsFilter")).toEqual("a query")
    })

    it("should show the option to add songs to favs/playlists on demand", () => {
        const wrapper = shallow( <SongsTableEnhanced songs={songs} withPlaylistDropdown={false} /> )
        // Check that there is no search bar
        expect(wrapper.find("#playlistSelector").exists()).toBeFalsy()
    })

    it("should let me star songs", () => {
        const setStarOnSongs = jest.fn()
        const wrapper = shallow( <SongsTableEnhanced songs={songs} setStarOnSongs={setStarOnSongs} /> )
        // Select some songs
        const selectedSongs = songs.slice(5)
        wrapper.find("#songsTable").simulate("songsSelected", selectedSongs)
        // Try to add them to favourites
        wrapper.find("#playlistSelector").simulate("favouritesSelected")
        // Check the operation is requested
        expect(setStarOnSongs).toHaveBeenCalledWith(selectedSongs, true)
    })

    it("should let me add songs to a playlist", () => {
        const addSongsToPlaylist = jest.fn()
        const wrapper = shallow( <SongsTableEnhanced songs={songs} addSongsToPlaylist={addSongsToPlaylist} /> )
        // Select some songs
        const playlist = {id : 1}
        const selectedSongs = songs.slice(5)
        wrapper.find("#songsTable").simulate("songsSelected", selectedSongs)
        // Try to add them to favourites
        wrapper.find("#playlistSelector").simulate("playlistSelected", playlist)
        // Check the operation is requested
        expect(addSongsToPlaylist).toHaveBeenCalledWith(playlist, selectedSongs)
    })

    it("should not let me modify songs if nothing is selected", () => {
        const wrapper = shallow( <SongsTableEnhanced songs={songs} /> )
        // Check the option to star songs is disabled
        expect(wrapper.find("#playlistSelector").prop("disabled")).toBeTruthy()
    })

})