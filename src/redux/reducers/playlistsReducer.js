import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default (state = initialState.playlists, action) => {
    switch (action.type) {
        // When the playlists are loaded, normalize data for the store
        case types.LOAD_PLAYLISTS_SUCCESS:
            // Join playlists in a new object to avoid modifying the state
            let playlists = {}
            for (var i = 0; i < action.playlists.length; i++) {
                let p = action.playlists[i]
                playlists[p.id] = p
            }
            // Return mixed with the state
            return Object.assign({}, state, {
                playlists : playlists
            })
        default:
            return state;
    }
}