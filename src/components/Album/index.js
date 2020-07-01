// Redux
import { connect } from "react-redux"
import { addSongsToPlaylist } from "../../redux/actions/playlistsActions"
import { setStarOnSongs } from "../../redux/actions/favouritesActions"
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

const mapDispatchToProps = { addSongsToPlaylist, setStarOnSongs }

export default connect(mapStateToProps, mapDispatchToProps)(Album)