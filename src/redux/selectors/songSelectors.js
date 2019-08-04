import { createSelector } from 'reselect'

const getPlaylist = (state, props) => state.playlists.byId[props.playlistId]

const getAlbum = (state, props) => state.albums.byId[props.albumId]

const getSongs = (state, props) => state.songs.byId

export const makeGetSongsOfAlbum = () => {
    return createSelector (
        [ getAlbum, getSongs ],
        (album, songs) => {
            return album ? Object.keys(songs).map(id => songs[id]).filter(song => song.albumId === album.id) : []
        }
    )
}

export const songsSelector = createSelector(
    [getSongs],
    songs => Object.keys(songs).map(id => songs[id])
)

export const songsOfArtistSelector = createSelector(
    [getSongs, (state, props) => props.artistId ],
    (songs, artistId) => {
        return Object.keys(songs).map(id => songs[id]).filter(song => song.artistId === artistId)
    }
)

export const songsOfPlaylistSelector = createSelector(
    [getPlaylist, getSongs],
    (playlist, songs) => {
        return (playlist && playlist.songs) ? playlist.songs.map(id => songs[id]) : []
    }
)