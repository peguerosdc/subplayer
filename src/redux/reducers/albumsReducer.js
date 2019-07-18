import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default (state = initialState.albumsContent, action) => {
    switch (action.type) {
        case types.LOAD_ALBUM_SUCCESS:
            return Object.assign({}, state, {
                albums : [...state.albums, action.album]
            })
        default:
            return state;
    }
}