import * as types from "../actions/actionTypes";
import initialState from "./initialState";
import {createReducer} from '../../utils/redux.js';

export default createReducer(initialState.albums, {
    [types.LOAD_ALBUM_SUCCESS]: (state, payload) => {
        const album = payload.album
        return {
            ...state,
            byId : {
                ...state.byId,
                [album.id] : album
            }
        }
    },
    [types.STAR_SONG_RESULT]: (state, payload) => {
        // Look for at least one song that has changed
        function hasASongThatChanged(songs) {
            return songs.find( song => hasSongStarChanged(song.id) )
        }

        // Check if the songId is found in the list of songs that changed (payload.songIds)
        function hasSongStarChanged(songId) {
            return payload.songIds.find(id => id === songId)
        }

        // Check if the songs are in any of the albums
        // If that's the case, then toggle its star to match
        // the new value
        let newAlbums = {...state.byId}
        Object.keys(state.byId).forEach( (albumId, index) => {
            const album = state.byId[albumId]
            if( hasASongThatChanged(album.song) ) {
                // Create a copy of this album
                newAlbums[albumId] = {
                    ...album,
                    song : album.song.map(
                        song => hasSongStarChanged(song.id) ? {...song, starred : payload.starred} : song
                    )
                }
            }
        })
        return {
            ...state,
            byId : newAlbums
        }
    },
    [types.LOGOUT_USER]: (state, payload) => initialState.albums
})