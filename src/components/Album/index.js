// Redux
import { connect } from "react-redux"
import { addSongsToPlaylist } from "../../redux/actions/playlistsActions"
import { setStarOnAlbums } from "../../redux/actions/albumActions"
import { makeGetSongsOfAlbum } from '../../redux/selectors/songSelectors'
// UI
import Album from './Album'

const mapStateToProps = (state, ownProps) => {
    const getSongsOfAlbum = makeGetSongsOfAlbum()
    return {
        "album" : state.albums.byId[ownProps.albumId],
        "songs" : getSongsOfAlbum(state, ownProps),
    }
}

const mapDispatchToProps = { addSongsToPlaylist, starAlbums: setStarOnAlbums }

export default connect(mapStateToProps, mapDispatchToProps)(Album)