import { createSelector } from 'reselect'

const getAlbums = (state) => state.albums.byId

const getArtistIdFromProps = (state, props) => props.artistId

export const getAlbumsOfArtist = createSelector(
    [ getArtistIdFromProps, getAlbums ],
    (artistId, albums) => {
        return Object.keys(albums).map(id => albums[id]).filter(album => album.artistId === artistId)
    }
)
