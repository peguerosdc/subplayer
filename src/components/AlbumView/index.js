// Redux
import { connect } from "react-redux"
import { loadAlbum } from "../../redux/actions/albumActions"
// UI
import AlbumView from './AlbumView'

const mapDispatchToProps = { loadAlbum }

export default connect(null, mapDispatchToProps)(AlbumView)