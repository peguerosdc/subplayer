import * as types from "./actionTypes"
import * as alerts from "./alertsActions"

export function addSongsToQueue(songs) {
    return { type: types.ADD_SONGS_TO_QUEUE, payload: {songs}, ...alerts.alertSuccessObject(`${songs.length} songs added to the queue!`) }
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

export function clearQueue() {
    return { type: types.CLEAR_QUEUE }
}

export function removeSongsFromQueue(songs) {
    return { type: types.REMOVE_SONGS_FROM_QUEUE, payload: {songs} }
}
