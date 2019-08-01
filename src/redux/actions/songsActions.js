import * as types from "./actionTypes";
import subsonic from "../../api/subsonicApi";
import { beginAsyncTask, asyncTaskSuccess, asyncTaskError } from "./apiStatusActions";

// "position" and "clear" are meant to be used when implementing queue management
export function addSongsToQueue(songs, position=0, clear=true) {
    return (dispatch) => {
        dispatch({ type: types.ADD_SONGS_TO_QUEUE, payload: {songs} })
    }
}

export function playNextSong() {
    return (dispatch) => {
        dispatch({ type: types.PLAY_NEXT_SONG })
    }
}

export function playPreviousSong() {
    return (dispatch) => {
        dispatch({ type: types.PLAY_PREVIOUS_SONG })
    }
}

function starredSongModified(songId, setStarred) {
    return { type: types.STAR_SONG_RESULT, payload : { songId: songId, starred : setStarred } }
}

export function setStarOnSong(songId, setStarred) {
    return async (dispatch) => {
        dispatch(beginAsyncTask())
        try {
            let result = null
            if( setStarred ) {
                result = await subsonic.star(songId)
            }
            else {
                result = await subsonic.unstar(songId)   
            }
            // Dispatch result
            if( result ) {
                dispatch(starredSongModified(songId, setStarred))
                dispatch(asyncTaskSuccess())
            }
            else {
                dispatch(asyncTaskError("Unable to star/unstar song"))
            }
        }
        catch(error) {
            console.error(error)
            dispatch(asyncTaskError(error.message))
        }
    }
}