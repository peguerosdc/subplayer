import * as types from "../actions/actionTypes"
import initialState from "./initialState"
import {createReducer} from '../../utils/redux.js'

export default createReducer(initialState.albums, {
    [types.LOAD_ALBUM_SUCCESS]: (state, payload) => {
        const album = payload.album
        album.song = album.song.map(song => song.id)
        return {
            ...state,
            byId : {
                ...state.byId,
                [album.id] : album
            }
        }
    },
    [types.LOAD_ONE_ARTIST_SUCCESS]: (state, payload) => {
        // Normalize the albums of the artist to just contain the IDs
        const artists_albums_by_id = {}
        payload.artist.album.forEach(album => {
            artists_albums_by_id[album.id] = album
        })
        return {
            ...state,
            byId : artists_albums_by_id
        }
    },
    [types.LOAD_SONGS_OF_ONE_ARTIST_SUCCESS]: (state, payload) => {
        // Look for albums with songs present in this payload and
        // put its corresponding IDs
        let newByIdState = {...state.byId}
        payload.songs.forEach(song => {
            const thisAlbum = newByIdState[song.albumId]
            if( thisAlbum ){
                newByIdState = {
                    ...newByIdState,
                    [song.albumId] : {
                        ...thisAlbum,
                        song : thisAlbum.song ? thisAlbum.song.concat(song.id) : [song.id]
                    }
                }
            }
        })
        return {
            ...state,
            byId : newByIdState
        }
    },
    [types.STAR_ALBUM_RESULT]: (state, payload) => {
        let newAlbumsById = {}
        payload.albumIds.forEach(albumId => {
            newAlbumsById[albumId] = {
                ...state.byId[albumId],
                starred: payload.starred
            }
        })
        return {
            ...state,
            byId: {
                ...state.byId,
                ...newAlbumsById,
            }
        }
    },
    [types.LOGOUT_USER]: (state, payload) => initialState.albums
})