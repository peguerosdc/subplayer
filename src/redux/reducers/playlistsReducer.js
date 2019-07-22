import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default (state = initialState.playlists, action) => {
    var playlists = {}
    switch (action.type) {
        // When the playlists are loaded, normalize data for the store
        case types.LOAD_PLAYLISTS_SUCCESS:
            // Join playlists in a new object to avoid modifying the state
            playlists = {}
            for (var i = 0; i < action.playlists.length; i++) {
                var p = action.playlists[i]
                playlists[p.id] = p
            }
            // Return mixed with the state
            return Object.assign({}, state, {
                playlists : playlists
            })
        case types.LOAD_ONE_PLAYLIST_SUCCESS:
            playlists = Object.assign({}, state.playlists)
            playlists[action.playlist.id] = action.playlist
            return Object.assign({}, state, {
                playlists : playlists
            })
        case types.ADD_SONGS_TO_PLAYLIST_SUCCESS:
        default:
            return state
    }
}