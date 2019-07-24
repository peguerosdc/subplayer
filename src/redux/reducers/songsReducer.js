import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default (state = initialState.songs, action) => {
    const hasPrevious = state.currentIndex > 0
    const hasNext = (state.currentIndex != null) && (state.currentIndex + 1 < state.queue.length)
    switch (action.type) {
        case types.ADD_SONGS_TO_QUEUE:
            return Object.assign({}, state, {
                currentIndex : 0,
                current : action.songs[0],
                queue : action.songs
            })
        case types.PLAY_NEXT_SONG:
            return Object.assign({}, state, hasNext ? {
                currentIndex : state.currentIndex+1,
                current : state.queue[state.currentIndex+1]
            } : { currentIndex : null, current : null })
        case types.PLAY_PREVIOUS_SONG:
            return Object.assign({}, state, hasPrevious ? {
                currentIndex : state.currentIndex-1,
                current : state.queue[state.currentIndex-1]
            } : {})
        case types.LOGOUT_USER:
            return initialState.songs
        default:
            return state;
    }
}