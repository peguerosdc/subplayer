import React from 'react'
import { shallow } from 'enzyme'
import { ArtistAllSongs } from "./ArtistAllSongs"

const props = {
    style : {
        flexGrow : 1
    },
    songs : [
        {
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
        },
        {
            "album": "21",
            "albumId": "506fe2e8-ee8d-4d12-b61d-4c0b96608f1c",
            "artist": "Adele",
            "artistId": "c299a083-4f82-4288-805f-0e97a9bb39a8",
            "bitRate": 320,
            "contentType": "audio/mpeg",
            "coverArt": "8cc7604f-88d0-4664-857c-93516290424e",
            "created": "2019-07-29T23:28:59",
            "discNumber": 1,
            "duration": 285,
            "genre": "Pop",
            "isDir": false,
            "isVideo": false,
            "parent": "f57575f2-08b4-450a-a1ce-9defda3c3234",
            "path": "Adele/21/11 - Someone Like You.mp3",
            "size": 12121397,
            "starred": "2019-08-01T04:23:28",
            "suffix": "mp3",
            "title": "Someone Like You",
            "track": 11,
            "type": "music",
            "year": 2011
        }
    ]
}

describe("<ArtistAllSongs />", () => {

    it("renders without crashing", () => {
        shallow( <ArtistAllSongs /> )
    })

    it("should show a table with the desired songs", () => {
        const enzymeWrapper = shallow( <ArtistAllSongs songs={props.songs} /> )
        expect( enzymeWrapper.find("Connect(SongsTableEnhanced)").prop("songs") ).toEqual(props.songs)
    })

    it("should show a table with the desired style", () => {
        const enzymeWrapper = shallow( <ArtistAllSongs style={props.style} /> )
        expect( enzymeWrapper.find("Connect(SongsTableEnhanced)").prop("style") ).toEqual(props.style)
    })

})