import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default (state = initialState.albumsContent, action) => {
    switch (action.type) {
        case types.LOAD_ALBUM_SUCCESS:
            var album = {}
            album[action.album.id] = action.album
            return Object.assign({}, state, album)
        default:
            return state;
    }
}