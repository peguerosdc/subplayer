import React from 'react'
import { shallow } from 'enzyme'
import {SongsResult} from "./SongsResult"

describe("<SongsResult />", () => {

    it("renders without crashing", () => {
    	const songs = [{id : 1}]
        shallow( <SongsResult songs={songs} /> )
    })

})