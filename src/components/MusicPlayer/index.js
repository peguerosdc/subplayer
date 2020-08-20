// Redux
import { connect } from "react-redux"
import { playNextSong, playPreviousSong, toggleShuffle } from "../../redux/actions/songsActions"
import { setStarOnSongs } from "../../redux/actions/favouritesActions"
import { getSongCurrentlyPlayingSelector } from '../../redux/selectors/musicPlayerSelector'
// UI
import MusicPlayer from './MusicPlayer'

const mapStateToProps = (state) => {
    return {
        "song" : getSongCurrentlyPlayingSelector(state),
        "isShuffleOn": state.musicPlayer.isShuffleOn,
    }
}

const mapDispatchToProps = { playNextSong, playPreviousSong, setStarOnSongs, toggleShuffle }

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MusicPlayer)