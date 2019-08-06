import * as types from "./actionTypes"

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
