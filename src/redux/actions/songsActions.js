import * as types from "./actionTypes";
import subsonic from "../../api/subsonicApi";
import { beginAsyncTask, asyncTaskSuccess, asyncTaskError, asyncTaskWarning } from "./apiStatusActions";

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

function starredSongModified(songIds, setStarred) {
    return { type: types.STAR_SONG_RESULT, payload : { songIds: songIds, starred : setStarred } }
}

export function setStarOnSongs(songs, setStarred) {
    return async (dispatch) => {
        dispatch(beginAsyncTask())
        // We need to remove the songs that are already starred before calling the API
        const songIds = songs.filter(song => song.starred !== setStarred).map(song => song.id)
        if( songIds.length === 0 ) {
            dispatch(asyncTaskWarning("All songs are already in favourites"))
        }
        else {
            try {
                let result = null
                if( setStarred ) {
                    result = await subsonic.star(songIds)
                }
                else {
                    result = await subsonic.unstar(songIds)   
                }
                // Dispatch result
                if( result ) {
                    dispatch(starredSongModified(songIds, setStarred))
                    dispatch(asyncTaskSuccess("Song added to favourites"))
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
}

export function putLoadedSongs(songs, clearCurrentList = true) {
    return { type: types.PUT_SONGS_RESULT, payload : {songs: songs, clearCurrentList : clearCurrentList} }
}