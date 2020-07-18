// Redux
import { connect } from "react-redux"
import { putSongsInQueue } from "../../redux/actions/songsActions"
import { getSongCurrentlyPlayingSelector } from '../../redux/selectors/musicPlayerSelector'
// UI
import SongsList from './SongsList'

const mapStateToProps = (state) => {
    return {
        currentSongPlaying : getSongCurrentlyPlayingSelector(state)
    }
}

const mapDispatchToProps = { putSongsInQueue }

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SongsList)