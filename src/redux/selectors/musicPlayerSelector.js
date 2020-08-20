import { createSelector } from 'reselect'

const getQueue = (state) => state.musicPlayer.queue

const getQueueSongs = (state) => state.musicPlayer.songsById

const getCurrentlyPlayingIndex = (state) => state.musicPlayer.currentSongIndex

const getCurrentlyPlayingId = (state) => state.musicPlayer.currentSongId

export const getSongCurrentlyPlayingSelector = createSelector(
    [getQueue, getCurrentlyPlayingId, getQueueSongs],
    (queue, currentId, songs) => songs[currentId]
)

// Only return the songs pending to be played
export const getSongsInQueueSelector = createSelector(
    [getQueue, getCurrentlyPlayingIndex, getQueueSongs],
    (queue, currentIndex, songs) => currentIndex !== null ? queue.slice(currentIndex).map( id => songs[id] ) : []
)