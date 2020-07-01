// Redux
import { connect } from "react-redux"
import { playNextSong, playPreviousSong } from "../../redux/actions/songsActions"
import { setStarOnSongs } from "../../redux/actions/favouritesActions"
import { getSongCurrentlyPlayingSelector } from '../../redux/selectors/musicPlayerSelector'
// UI
import MusicPlayer from './MusicPlayer'

const mapStateToProps = (state) => {
    return {
        "song" : getSongCurrentlyPlayingSelector(state)
    }
}

const mapDispatchToProps = { playNextSong, playPreviousSong, setStarOnSongs }

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MusicPlayer)