import { createSelector } from 'reselect'

const getQueue = (state) => state.musicPlayer.queue

const getQueueSongs = (state) => state.musicPlayer.songsById

const getCurrentlyPlayingIndex = (state) => state.musicPlayer.currentSongIndex

export const getSongCurrentlyPlayingSelector = createSelector(
    [getQueue, getCurrentlyPlayingIndex, getQueueSongs],
    (queue, index, songs) => songs[queue[index]]
)