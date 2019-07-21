import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default (state = initialState.artistContent, action) => {
    switch (action.type) {
        case types.LOAD_ARTISTS_SUCCESS:
            return Object.assign({}, state, {
                artists : action.artists
            })
        default:
            return state;
    }
}