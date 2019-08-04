import * as types from "../actions/actionTypes";
import initialState from "./initialState";
import {createReducer} from '../../utils/redux.js';

function put_songs_in_store(state, songs, clearCurrentList = true) {
    // Transform the array of songs coming in the payload to a normalized object
    let normalized_songs = songs.reduce( (current,song) => ({...current, [song.id] : song }), {} )
    // Replace the current songs if "clearCurrentList" or append the new songs to
    // the existing list
    const newSongs = clearCurrentList
        ? normalized_songs
        : {...state.byId, ...normalized_songs}
    return { ...state, byId : newSongs }
}

export default createReducer(initialState.songs, {
    [types.STAR_SONG_RESULT] : (state, payload) => {
        let newState = state
        // Toggle if it is found in the DB of songs
        const modifiedSongsInDB = payload.songIds.filter(id => state.byId[id])
        modifiedSongsInDB.forEach( (id) => {
            newState = {
                ...newState,
                byId : {
                    ...newState.byId,
                    [id] : {
                        ...newState.byId[id],
                        starred : payload.starred
                    }
                }
            }
        })
        return newState
    },
    [types.PUT_SONGS_RESULT] : (state, payload) => put_songs_in_store(state, payload.songs, payload.clearCurrentList),
    [types.LOAD_SONGS_OF_ONE_ARTIST_SUCCESS] : (state, payload) => put_songs_in_store(state, payload.songs, true),
    [types.LOAD_ALBUM_SUCCESS] : (state, payload) => put_songs_in_store(state, payload.album.song, true),
    [types.LOAD_SINGLE_PLAYLIST_SUCCESS] : (state, payload) => put_songs_in_store(state, payload.playlist.entry, true),
    [types.LOGOUT_USER]: (state, payload) => initialState.songs
})