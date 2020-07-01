// Redux
import { connect } from "react-redux"
import { getSongCurrentlyPlayingSelector } from '../../redux/selectors/musicPlayerSelector'
// UI
import ArtistListElement from './ArtistListElement'

const mapStateToProps = (state, ownProps) => {
    return {
        currentSongPlaying : getSongCurrentlyPlayingSelector(state),
    }
}

export default connect(
    mapStateToProps,
    null
)(ArtistListElement)