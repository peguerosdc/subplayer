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

export function get_shuffled_songs(songToPlay, songs) {
    // build a list with the ids of the songs to play
    let newList = songs.reduce(function(accum, current) {
        // remove the song to play as it will be placed
        if (current.id !== songToPlay.id) {
            return accum.concat(current.id)
        }
        return accum
    }, [])
    // shuffle it
    newList.sort(() => Math.random() - 0.5)
    // place the songToPlay at the beginning of the queue
    return [songToPlay.id, ...newList] 
}

export function get_ordered_songs(songToPlay, songs) {
    let found = false
    return songs.reduce(function(accum, current) {
        // build a list of the songs to play (after the songToPlay)
        // to preserve order
        if(!found) {
            if (current.id === songToPlay.id) {
                found = true
                return accum.concat(current.id)
            }
            else {
                return accum
            }
        }
        else {
            return accum.concat(current.id)
        }
    }, [])
}