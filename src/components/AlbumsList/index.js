// Redux
import { connect } from "react-redux"
import { loadAlbums } from "../../redux/actions/albumActions"
// UI
import AlbumsList from "./AlbumsList"

const mapStateToProps = (state, ownProps) => {
    return {
        "albums" : state.albums.byId
    }
}

const mapDispatchToProps = { loadAlbums }

export default connect(mapStateToProps, mapDispatchToProps)(AlbumsList)