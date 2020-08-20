export function createReducer(initialState, reducerMap) {
    return (state = initialState, action) => {
        const reducer = reducerMap[action.type]
        return reducer
            ? reducer(state, action.payload)
            : state
    }
}

export function normalize_songs_processor(song, dict) {
    dict[song.id] = song
    return dict
}

export function original_songs_processor(song, list) {
    list.push(song.id)
    return list
}

export function get_normalized_songs(songs) {
    // Transform the array of songs coming in the payload to a normalized object
    return songs.reduce( (current,song) => normalize_songs_processor(song, current), {} )
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

export function get_shuffled_songs(songs, songToPlayId, processor=null) {
    let getCurrentId = songs[0].id ? ((current) => current.id) : ((current) => current)
    // build a list with the ids of the songs to play
    let newList = songs.reduce(function(accum, current) {
        // do some other processing to the songs if needed
        processor && processor(current)
        // remove the song to play as it will be placed
        const currentId = getCurrentId(current)
        if (currentId !== songToPlayId) {
            return accum.concat(currentId)
        }
        return accum
    }, [])
    // shuffle it
    newList.sort(() => Math.random() - 0.5)
    // place the songToPlayId at the beginning of the queue
    return songToPlayId ? [songToPlayId, ...newList] : newList
}

export function get_ordered_songs(songs, songToPlayId, processor=null) {
    let found = false
    // check if the array is of objects or of IDs
    let getCurrentId = songs[0].id ? ((current) => current.id) : ((current) => current)
    return songs.reduce(function(accum, current) {
        // do some other processing to the songs if needed
        processor && processor(current)
        // build a list of the songs to play (after the songToPlayId)
        // to preserve order
        const currentId = getCurrentId(current)
        if(songToPlayId && !found) {
            if (currentId === songToPlayId) {
                found = true
                return accum.concat(currentId)
            }
            else {
                return accum
            }
        }
        else {
            return accum.concat(currentId)
        }
    }, [])
}