// Redux
import { connect } from "react-redux"
import { createPlaylist } from "../../redux/actions/playlistsActions"
// UI
import CreatePlaylistModal from './CreatePlaylistModal'

const mapDispatchToProps = { createPlaylist }

export default connect(
    null,
    mapDispatchToProps
)(CreatePlaylistModal)