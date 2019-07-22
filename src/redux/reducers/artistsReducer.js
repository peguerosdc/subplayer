import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default (state = initialState.artists, action) => {
    switch (action.type) {
        case types.LOAD_ARTISTS_SUCCESS:
            return action.artists
        default:
            return state;
    }
}