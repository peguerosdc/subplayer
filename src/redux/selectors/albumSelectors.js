import { createSelector } from 'reselect'

const getAlbums = (state) => Object.keys(state.albums.byId).map(id => state.albums.byId[id])

const getArtistIdFromProps = (state, props) => props.artistId

export const getAlbumsOfArtist = createSelector(
    [ getArtistIdFromProps, getAlbums ],
    (artistId, albums) => {
        return albums.filter(album => album.artistId === artistId)
    }
)

export const albumsSelector = createSelector(
    [getAlbums],
    albums => albums
)
