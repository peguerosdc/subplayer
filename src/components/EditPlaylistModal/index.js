// Redux
import { connect } from "react-redux"
import { editPlaylist } from "../../redux/actions/playlistsActions"
// UI
import EditPlaylistModal from './EditPlaylistModal'

const mapStateToProps = (state, ownProps) => {
    return {
        "playlist" : state.playlists.byId[ownProps.playlistId],
    }
}

const mapDispatchToProps = { editPlaylist }

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(EditPlaylistModal)