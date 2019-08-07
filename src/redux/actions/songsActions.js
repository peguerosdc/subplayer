import * as types from "./actionTypes"

export const addSongsToQueueAction = (songs) => ({ type: types.ADD_SONGS_TO_QUEUE, payload: {songs} })

// "position" and "clear" are meant to be used when implementing queue management
export function addSongsToQueue(songs, position=0, clear=true) {
    return (dispatch) => {
        dispatch(addSongsToQueueAction(songs))
    }
}

export const playNextSongAction = () => ({ type: types.PLAY_NEXT_SONG })

export function playNextSong() {
    return (dispatch) => {
        dispatch(playNextSongAction())
    }
}

export const playPreviousSongAction = () => ({ type: types.PLAY_PREVIOUS_SONG })

export function playPreviousSong() {
    return (dispatch) => {
        dispatch(playPreviousSongAction())
    }
}
