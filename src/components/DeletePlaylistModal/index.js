// Redux
import { connect } from "react-redux"
import { deletePlaylist } from "../../redux/actions/playlistsActions"
// UI
import DeletePlaylistModal from './DeletePlaylistModal'

const mapStateToProps = (state, ownProps) => {
    return {
        "playlist" : state.playlists.byId[ownProps.playlistId],
    }
}

const mapDispatchToProps = { deletePlaylist }

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DeletePlaylistModal)