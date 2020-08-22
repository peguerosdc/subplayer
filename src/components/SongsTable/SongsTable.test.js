import React from 'react'
import { shallow } from 'enzyme'
import SongsTable from "./SongsTable"

describe("<SongsTable />", () => {
    const songs = [...Array(500).keys()].map(i => {return {
        id : i.toString(),
        title: `song ${i}`,
        artist : `artist ${Math.random().toString(36).substring(7)}`,
        album : `album ${i}`,
        starred: i%2 == 0
    }})

    it("renders without crashing", () => {
        shallow( <SongsTable /> )
    })

    it("renders a list of songs without crashing", () => {
        const wrapper = shallow( <SongsTable songs={songs} /> )
    })

    it("should start playing the list of songs when an item is clicked", () => {
        const putSongsInQueue = jest.fn()
        const wrapper = shallow( <SongsTable songs={songs} putSongsInQueue={putSongsInQueue}/> )
        wrapper.find("#songsTable").simulate("rowClick", songs[0])
        expect(putSongsInQueue).toHaveBeenCalledTimes(1)
    })

    it("should let me select a single song", () => {
        const onSongsSelected = jest.fn()
        const wrapper = shallow( <SongsTable songs={songs} onSongsSelected={onSongsSelected}/> )
        wrapper.find("#checkColumn").simulate("change", songs[0])
        expect(onSongsSelected).toHaveBeenCalledTimes(1)
    })

    it("should let me select all songs", () => {
        const onSongsSelected = jest.fn()
        const wrapper = shallow( <SongsTable songs={songs} onSongsSelected={onSongsSelected}/> )
        wrapper.find("#checkAllCell").simulate("change", songs[0])
        expect(onSongsSelected).toHaveBeenCalledTimes(1)
    })

    it("should let me change the sorting of the songs", () => {
        const onSongsSorted = jest.fn()
        const wrapper = shallow( <SongsTable songs={songs} onSongsSorted={onSongsSorted} /> )
        wrapper.find("#songsTable").simulate("sortColumn", "artist", "asc")
        // TODO: check sorting. How to deal with the async call without explicitly  calling the method?
    })

    it("should let me apply a filter on the songs", () => {
        const wrapper = shallow( <SongsTable songs={songs} /> )
        wrapper.setProps({songsFilter: "5"})
        // TODO: check filtering. How to deal with the async call without explicitly  calling the method?
    })

    it("should let me overwrite the default click action", () => {
        const onSongClicked = jest.fn()
        const wrapper = shallow( <SongsTable songs={songs} onSongClicked={onSongClicked}/> )
        wrapper.find("#songsTable").simulate("rowClick", songs[0])
        expect(onSongClicked).toHaveBeenCalledTimes(1)
    })

})