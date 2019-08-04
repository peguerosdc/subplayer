import * as types from "./actionTypes";
import subsonic from "../../api/subsonicApi";
import { beginAsyncTask, asyncTaskSuccess, asyncTaskError, asyncTaskWarning } from "./apiStatusActions";

export function loadFavouriteSongs() {
    return async (dispatch) => {
        dispatch(beginAsyncTask())
        try {
            const favourites = await subsonic.getStarred()
            const favSongs = favourites["song"] || []
            // Set to state
            dispatch({type: types.PUT_SONGS_RESULT, payload: { songs : favSongs} })
            dispatch({type: types.LOAD_FAVOURITES_RESULT, payload: {songs : favSongs.map(song => song.id)} })
            dispatch(asyncTaskSuccess())
        }
        catch(error) {
            console.error(error)
            dispatch(asyncTaskError("Could not retrieve favourites"))
        }
    }
}

function starredSongModified(songIds, setStarred) {
    return { type: types.STAR_SONG_RESULT, payload : { songIds: songIds, starred : setStarred } }
}

export function setStarOnSongs(songs, setStarred) {
    return async (dispatch) => {
        dispatch(beginAsyncTask())
        // We need to remove the songs that are already starred before calling the API.
        // As song.starred is a string with the date the song was starred,
        // we need to "toggle" it to convert to a boolean
        const songIds = songs.filter(song => !song.starred === setStarred).map(song => song.id)
        if( songIds.length === 0 ) {
            dispatch(asyncTaskWarning("All songs are already in favourites"))
        }
        else {
            try {
                let result = null
                let message = null
                if( setStarred ) {
                    result = await subsonic.star(songIds)
                    message = result ? "Songs added to favs!" : "Unable to add songs"
                }
                else {
                    result = await subsonic.unstar(songIds)   
                    message = result ? "Songs removed from favs!" : "Unable to remove songs"
                }
                // Dispatch result
                if( result ) {
                    dispatch(starredSongModified(songIds, setStarred))
                    dispatch(asyncTaskSuccess(message))
                }
                else {
                    dispatch(asyncTaskError(message))
                }
            }
            catch(error) {
                console.error(error)
                dispatch(asyncTaskError(`Could not change ${songIds.length} songs`))
            }
        }
        
    }
}