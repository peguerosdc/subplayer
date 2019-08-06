import { createSelector } from 'reselect'

const getSearchSongsById = (state) => state.search.songsById

const getSearchSongsIds = (state) => state.search.songs

export const searchSongsSelector = createSelector(
    [getSearchSongsById, getSearchSongsIds],
    (songs, songIds) => songIds.map(id => songs[id])
)
