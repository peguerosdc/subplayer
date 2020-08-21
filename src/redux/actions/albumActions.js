import * as types from "./actionTypes"
import subsonic from "../../api/subsonicApi"
import { beginAsyncTask, asyncTaskSuccess, asyncTaskError, asyncTaskWarning } from "./apiStatusActions"

/* Load one album at a time */
export function loadAlbumSuccess(album) {
    return { type: types.LOAD_ALBUM_SUCCESS, payload: { album: album } }
}

export function loadAlbum(albumId) {
    return async (dispatch) => {
        dispatch(beginAsyncTask())
        try {
            const album = await subsonic.getAlbum(albumId)
            dispatch(loadAlbumSuccess(album))
            dispatch(asyncTaskSuccess())
        }
        catch(error) {
            console.error(error)
            dispatch(asyncTaskError("Unable to load album"))
        }
    }
}

export function starredAlbumModified(albumIds, setStarred) {
    return { type: types.STAR_ALBUM_RESULT, payload : { albumIds: albumIds, starred : setStarred } }
}

export function setStarOnAlbums(albums, setStarred) {
    return async (dispatch) => {
        dispatch(beginAsyncTask())
        // We need to remove the albums that are already starred before calling the API.
        // As song.starred is a string with the date the song was starred,
        // we need to "toggle" it to convert to a boolean
        const albumIds = albums.filter(album => !album.starred === setStarred).map(album => album.id)
        if( albumIds.length === 0 ) {
            dispatch(asyncTaskWarning("All albums are already starred"))
        }
        else {
            try {
                let result = null
                let message = null
                if( setStarred ) {
                    result = await subsonic.starAlbums(albumIds)
                    message = result ? "Albums added to favs!" : "Unable to star albums"
                    setStarred = new Date().toISOString()
                }
                else {
                    result = await subsonic.unstarAlbums(albumIds)   
                    message = result ? "Albums removed from favs!" : "Unable to unstar albums"
                }
                // Dispatch result
                if( result ) {
                    dispatch(starredAlbumModified(albumIds, setStarred))
                    dispatch(asyncTaskSuccess(message))
                }
                else {
                    dispatch(asyncTaskError(message))
                }
            }
            catch(error) {
                console.error(error)
                dispatch(asyncTaskError(`Could not change ${albumIds.length} albums`))
            }
        }
    }
}

export function albumListLoaded(albums) {
    return { type: types.LOAD_ALBUMS_LIST_SUCCESS, payload : { albums: albums } }
}

export function loadAlbums(filter, values, page, pageSize=24) {
    return async (dispatch) => {
        dispatch(beginAsyncTask())
        // Search with the subsonic API for the matching albums
        try {
            const albums = await subsonic.getAlbumList2(filter, values, page*pageSize, pageSize)
            dispatch(albumListLoaded(albums.reverse()))
            dispatch(asyncTaskSuccess())
        }
        catch(error) {
            console.error(error)
            dispatch(asyncTaskError(`Could not load '${filter}' albums`))
        }
    }
}