import React from 'react'
import { shallow } from 'enzyme'
import MusicPlayer from "./MusicPlayer"

describe("<MusicPlayer />", () => {

	const song = {
		"id" : "song1",
        "album": "21",
        "albumId": "506fe2e8-ee8d-4d12-b61d-4c0b96608f1c",
        "artist": "Adele",
        "artistId": "c299a083-4f82-4288-805f-0e97a9bb39a8",
        "bitRate": 320,
        "contentType": "audio/mpeg",
        "coverArt": "d5d99cde-4653-4182-bb80-5655019a6a58",
        "created": "2019-07-29T23:29:11",
        "discNumber": 1,
        "duration": 228,
        "genre": "Pop",
        "isDir": false,
        "isVideo": false,
        "parent": "f57575f2-08b4-450a-a1ce-9defda3c3234",
        "path": "Adele/21/01 - Rolling in the Deep.mp3",
        "size": 9849609,
        "starred": "2019-08-01T04:23:28",
        "suffix": "mp3",
        "title": "Rolling in the Deep",
        "track": 1,
        "type": "music",
        "year": 2011
    }

    it("renders without crashing", () => {
        shallow( <MusicPlayer /> )
    })

    it("should render correctly de data of a song", () => {
    	const wrapper = shallow( <MusicPlayer song={song} /> )
    	expect(wrapper.find("#song_name").text()).toEqual("Rolling in the Deep")
    	expect(wrapper.find("#song_artist").text()).toEqual("Adele")
    })

    it("should allow the user to skip to the next song", () => {
    	const playNextSong = jest.fn()
    	const wrapper = shallow( <MusicPlayer song={song} playNextSong={playNextSong} /> )
    	wrapper.find("#next_button").simulate("click")
    	expect(playNextSong).toHaveBeenCalledTimes(1)
    })

    it("should allow the user to skip to the previous song", () => {
    	const playPreviousSong = jest.fn()
    	const wrapper = shallow( <MusicPlayer song={song} playPreviousSong={playPreviousSong} /> )
    	wrapper.find("#previous_button").simulate("click")
    	// expect(playPreviousSong).toHaveBeenCalledTimes(1)
        // TODO: this is not testable until MusicPlayer is decomposed into smaller components
    })

    it("should allow the user to star/unstar the current song", () => {
    	const setStarOnSongs = jest.fn()
    	const wrapper = shallow( <MusicPlayer song={song} setStarOnSongs={setStarOnSongs} /> )
    	wrapper.find("#star_button").simulate("click")
    	expect(setStarOnSongs).toHaveBeenCalledTimes(1)
    })

    it("should show if the current song is starred", () => {
    	const wrapper = shallow( <MusicPlayer song={song} /> )
    	expect(wrapper.find("#star_button").prop('icon').props.icon).toEqual('star')
    })

    it("should show if the current song is not starred", () => {
    	const wrapper = shallow( <MusicPlayer song={ {...song, 'starred' : null} } /> )
    	expect(wrapper.find("#star_button").prop('icon').props.icon).toEqual('star-o')
    })

    it("should play and pause songs", () => {
    	const wrapper = shallow( <MusicPlayer /> )
    	// When a song is set, it should start playing by default
    	wrapper.setProps({song : song})
    	expect(wrapper.find("#play_pause_button").prop('icon').props.icon).toEqual('pause')
    	// So we should be able to pause it
    	wrapper.find("#play_pause_button").simulate("click")
    	expect(wrapper.find("#play_pause_button").prop('icon').props.icon).toEqual('play')
    	// And we should be able to resume it
    	wrapper.find("#play_pause_button").simulate("click")
    	expect(wrapper.find("#play_pause_button").prop('icon').props.icon).toEqual('pause')
    })

    it("should support muting", () => {
        const wrapper = shallow( <MusicPlayer /> )
        // Mute
        wrapper.find("#mute").simulate("click")
        expect(wrapper.find("#mute").prop('icon').props.icon).toEqual('volume-off')
        // Unmute
        wrapper.find("#mute").simulate("click")
        expect(wrapper.find("#mute").prop('icon').props.icon).toEqual('volume-up')
    })

    it("should support shuffling", () => {
        const toggleShuffle = jest.fn()
        const wrapper = shallow( <MusicPlayer isShuffleOn={true} toggleShuffle={toggleShuffle} /> )
        // Toggle shuffle
        wrapper.find("#shuffle_button").simulate("click")
        expect(toggleShuffle).toHaveBeenCalledTimes(1)
    })

    it("should let me navigate to an artist", () => {
        const wrapper = shallow( <MusicPlayer song={song} /> )
        wrapper.find("#song_artist").simulate("click")
    })

    it("should let me navigate to an album", () => {
        const wrapper = shallow( <MusicPlayer song={song} /> )
        wrapper.find("#song_album").simulate("click")
    })

    it("should not let me navigate to an album if not set", () => {
        const wrapper = shallow( <MusicPlayer /> )
        wrapper.find("#song_album").simulate("click")
    })
})