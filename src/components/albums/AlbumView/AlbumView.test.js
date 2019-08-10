import React from 'react'
import { shallow } from 'enzyme'
import { AlbumView } from "./AlbumView"


function setup() {

    const props = {
        loadAlbum: jest.fn(),
        albumId : "album_id"
    }

    return {props, albumView : <AlbumView {...props} /> }
}

describe("<AlbumView />", () => {

    it("renders without crashing", () => {
        const { albumView } = setup()
        shallow( albumView )
    })

    it("should start loading album when mounting", () => {
        const {props, albumView} = setup()
        const enzymeWrapper = shallow( albumView )
        expect( props.loadAlbum ).toHaveBeenCalled()
    })

})