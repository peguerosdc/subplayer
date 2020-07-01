import React from 'react'
import { shallow } from 'enzyme'
import Queue from "./QueueView"

describe("<Queue />", () => {

    const songs = [
        { "id" : "1" },
        { "id" : "2" },
    ]

    it("renders without crashing", () => {
        shallow( <Queue /> )
    })

    it("should clear the queue on click", () => {
        const clearQueue = jest.fn()
        const wrapper = shallow( <Queue songs={songs} clearQueue={clearQueue}/> )
        wrapper.find("#clear_button").simulate("click")
        expect(clearQueue).toHaveBeenCalledTimes(1)
    })

    it("should remove songs on click", () => {
        const removeSongsFromQueue = jest.fn()
        const wrapper = shallow( <Queue songs={songs} removeSongsFromQueue={removeSongsFromQueue}/> )
        // Select some songs
        const selectedSongs = [songs[0]]
        wrapper.find("#songs_table").simulate("songsSelected", selectedSongs)
        // Remove them from the queue
        wrapper.find("#remove_button").simulate("click")
        expect(removeSongsFromQueue).toHaveBeenCalledWith(selectedSongs)
    })

    it("should play any song in the queue", () => {
        const seekToSongInQueue = jest.fn()
        const wrapper = shallow( <Queue songs={songs} seekToSongInQueue={seekToSongInQueue}/> )
        // Click a song
        const songClicked = songs[0]
        wrapper.find("#songs_table").simulate("songClicked", songClicked)
        // Expect it to now play
        expect(seekToSongInQueue).toHaveBeenCalledWith(songClicked)
    })

})