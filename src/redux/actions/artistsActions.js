import * as types from "./actionTypes"
import subsonic from "../../api/subsonicApi"
import { beginAsyncTask, asyncTaskSuccess, asyncTaskError } from "./apiStatusActions"

/* Load multiple artists */
export function loadArtistsSuccess(artists) {
    return { type: types.LOAD_ARTISTS_INDEX_SUCCESS, payload: {artistsIndex: artists} }
}

export function loadArtists() {
    return async (dispatch) => {
        dispatch(beginAsyncTask())
        try {
            const artists = await subsonic.getArtists()
            dispatch(loadArtistsSuccess(artists))
            dispatch(asyncTaskSuccess())
        }
        catch(error) {
            console.error(error)
            dispatch(asyncTaskError("Could not load artists"))
        }
    }
}

/* Load songs of just one artist */
export const loadSongsOfArtistSuccess = songs => ({type : types.LOAD_SONGS_OF_ONE_ARTIST_SUCCESS, payload: { songs : songs} })

async function loadSongsOfArtist(artist) {
    // Create a "big" promise to fetch all albums and return
    // just one result with all the content
    return Promise.all( artist.album.map(album => subsonic.getAlbum(album.id)) )
        .then(response => {
            // Combine all the songs in one single result
            return response.reduce( (accum, current) => accum.concat(current.song), [] )
        })
}

/* Load information of one artist along with its songs */

export const loadOneArtistSuccess = artist => ({type: types.LOAD_ONE_ARTIST_SUCCESS, payload : {artist: artist}})

export function loadOneArtist(artistId) {
    return async (dispatch) => {
        dispatch(beginAsyncTask())
        try {
            const artist = await subsonic.getArtist(artistId)
            dispatch(loadOneArtistSuccess(artist))
            dispatch(asyncTaskSuccess())
            // Now load all its songs
            dispatch(beginAsyncTask())
            const songs = await loadSongsOfArtist(artist)
            dispatch(loadSongsOfArtistSuccess(songs))
            dispatch(asyncTaskSuccess())
        }
        catch(error) {
            console.error(error)
            dispatch(asyncTaskError("Unable to load artist"))
        }
    }
}