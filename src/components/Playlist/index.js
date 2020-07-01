// Redux
import { connect } from "react-redux"
import { removeSongsFromPlaylist, loadSinglePlaylist } from "../../redux/actions/playlistsActions"
import { songsOfPlaylistSelector } from '../../redux/selectors/songSelectors'
// UI
import Playlist from './Playlist'

const mapStateToProps = (state, ownProps) => {
    return {
        "playlist" : state.playlists.byId[ownProps.playlistId],
        "songs" : songsOfPlaylistSelector(state, ownProps)
    }
}

const mapDispatchToProps = { removeSongsFromPlaylist, loadSinglePlaylist }

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Playlist)