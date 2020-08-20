// Redux
import { connect } from "react-redux"
import { addSongsToPlaylist } from "../../redux/actions/playlistsActions"
import { addSongsToQueue, putSongsInQueue } from "../../redux/actions/songsActions"
import { setStarOnSongs } from "../../redux/actions/favouritesActions"
// UI
import SongsTableEnhanced from './SongsTableEnhanced'

const mapDispatchToProps = { addSongsToQueue, addSongsToPlaylist, setStarOnSongs, playAllSongs: putSongsInQueue }

export default connect(
    null,
    mapDispatchToProps
)(SongsTableEnhanced)
