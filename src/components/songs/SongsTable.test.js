import React from 'react'
import { shallow } from 'enzyme'
import {SongsTable} from "./SongsTable"

describe("<SongsTable />", () => {
    const songs = [...Array(500).keys()].map(i => {return {
        id : i.toString(),
        title: `song ${i}`,
        artist : `artist ${Math.random().toString(36).substring(7)}`,
        album : `album ${i}`
    }})

    it("renders without crashing", () => {
        shallow( <SongsTable /> )
    })

    it("renders a list of songs without crashing", () => {
        const wrapper = shallow( <SongsTable songs={songs} /> )
    })

    it("should start playing the list of songs when an item is clicked", () => {
        const addSongsToQueue = jest.fn()
        const wrapper = shallow( <SongsTable songs={songs} addSongsToQueue={addSongsToQueue}/> )
        wrapper.find("#songsTable").simulate("rowClick", songs[0])
        expect(addSongsToQueue).toHaveBeenCalledTimes(1)
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
        const wrapper = shallow( <SongsTable songs={songs} /> )
        wrapper.find("#songsTable").simulate("sortColumn", "artist", "asc")
        // TODO: check sorting. How to deal with the async call without explicitly  calling the method?
    })

    it("should let me apply a filter on the songs", () => {
        const wrapper = shallow( <SongsTable songs={songs} /> )
        wrapper.setProps({songsFilter: "5"})
        // TODO: check filtering. How to deal with the async call without explicitly  calling the method?
    })

})