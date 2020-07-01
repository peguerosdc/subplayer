// Redux
import { connect } from "react-redux"
import { putSongsInQueue } from "../../redux/actions/songsActions"
import { getSongCurrentlyPlayingSelector } from '../../redux/selectors/musicPlayerSelector'
// UI
import SongsTable from './SongsTable'

const mapStateToProps = (state) => {
    return {
        currentSongPlaying : getSongCurrentlyPlayingSelector(state)
    }
}

const mapDispatchToProps = { putSongsInQueue }

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SongsTable)