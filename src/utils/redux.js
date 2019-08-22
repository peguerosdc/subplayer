export function createReducer(initialState, reducerMap) {
    return (state = initialState, action) => {
        const reducer = reducerMap[action.type]
        return reducer
            ? reducer(state, action.payload)
            : state
    }
}

export function get_normalized_songs(songs) {
    // Transform the array of songs coming in the payload to a normalized object
    return songs.reduce( (current,song) => ({...current, [song.id] : song }), {} )
}

export function set_starred_song_on_state(currentState, songskey, songId, starred) {
    let newState = currentState
    if( newState[songskey][songId] ) {
        newState = {
            ...newState,
            [songskey] : {
                ...newState[songskey],
                [songId] : {
                    ...newState[songskey][songId],
                    starred : starred
                }
            }
        }
    }
    return newState
}