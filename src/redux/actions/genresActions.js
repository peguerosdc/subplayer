import * as types from "./actionTypes"
import subsonic from "../../api/subsonicApi"
import { beginAsyncTask, asyncTaskSuccess, asyncTaskError } from "./apiStatusActions"

async function performGenreRequests(genre) {
    // Load all the songs of this genre in chunks of 500 (max allowed by Subsonic API)
    let offsets = []
    let count = 0
    while( count < genre.songCount ) {
        offsets.push([count])
        count += 500
    }
    // Create a "big" promise to fetch all the songs and return
    // just one result with all the content
    return Promise.all( offsets.map(offset => subsonic.getSongsByGenre(genre.value, offset)) )
        .then(response => {
            // Combine all the songs in one single result
            return response.reduce( (accum, current) => accum.concat(current), [] )
        })
}

export const loadSongsOfGenreSuccess = songs => ({type : types.LOAD_SONGS_OF_GENRE_SUCCESS, payload: { songs : songs} })

export function loadSongsOfGenre(genre) {
    return async (dispatch) => {
        dispatch(beginAsyncTask())
        try {
            const songs = await performGenreRequests(genre)
            dispatch(loadSongsOfGenreSuccess(songs))
            dispatch(asyncTaskSuccess())
        }
        catch(error) {
            console.error(error)
            dispatch(asyncTaskError("Unable to load genre"))
        }
    }
}