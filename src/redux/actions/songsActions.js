import * as types from "./actionTypes"

export function addSongsToQueue(songs) {
    return { type: types.ADD_SONGS_TO_QUEUE, payload: {songs} }
}

export function putSongsInQueue(songs) {
    return { type: types.PUT_SONGS_IN_QUEUE, payload: {songs} }
}

export function playNextSong() {
    return { type: types.PLAY_NEXT_SONG }
}

export function playPreviousSong() {
    return { type: types.PLAY_PREVIOUS_SONG }
}
