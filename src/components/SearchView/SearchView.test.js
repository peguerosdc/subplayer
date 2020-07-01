import React from 'react'
import { shallow } from 'enzyme'
import SearchView from "./SearchView"

describe("<SearchView />", () => {

    it("renders without crashing when no results are available", () => {
        shallow( <SearchView /> )
    })

    it("renders without crashing when results are available", () => {
        const artists = [{id : "a1", name : "artist1"}]
        const albums = [{id : "a1", name : "album1"}]
        const songs = [{id : "s1", name : "song1"}]
        shallow( <SearchView artists={artists} albums={albums} songs={songs} /> )
    })

})