import { createSelector } from 'reselect'

const getPlaylist = (state, props) => state.playlists.byId[props.playlistId]

const getAlbum = (state, props) => state.albums.byId[props.albumId]

const getSongs = (state, props) => state.songs.byId

const getFavourites = (state, props) => state.favourites

export const makeGetSongsOfAlbum = () => {
    return createSelector (
        [ getAlbum, getSongs ],
        (album, songs) => {
            return (album && album.song)
                ? album.song.reduce( (accum,songId) => {
                    if( songs[songId] ) {
                        accum.push(songs[songId])
                    }
                    return accum
                }, [])
                : []
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

export const songsOfGenreSelector = createSelector(
    [getSongs, (state, props) => props.genre.value ],
    (songs, genre) => {
        return Object.keys(songs).map(id => songs[id]).filter(song => song.genre === genre)
    }
)

export const songsOfPlaylistSelector = createSelector(
    [getPlaylist, getSongs],
    (playlist, songs) => {
        return (playlist && playlist.songs)
            ? playlist.songs.reduce( (accum,songId) => {
                if( songs[songId] ) {
                    accum.push(songs[songId])
                }
                return accum
            }, [])
            : []
    }
)

export const favouriteSongsSelector = createSelector(
    [getSongs, getFavourites],
    (songs, favourites) => {
        return favourites.reduce( (accum,songId) => {
            if( songs[songId] ) {
                accum.push(songs[songId])
            }
            return accum
        }, [])
    }
)