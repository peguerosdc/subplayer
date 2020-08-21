// Redux
import { connect } from "react-redux"
import { loadAlbums } from "../../redux/actions/albumActions"
import { albumsSelector } from "../../redux/selectors/albumSelectors"
// UI
import {AlbumsList} from "./AlbumsList"

const mapStateToProps = (state, ownProps) => {
    return {
        "albums" : albumsSelector(state)
    }
}

const mapDispatchToProps = { loadAlbums }

export default connect(mapStateToProps, mapDispatchToProps)(AlbumsList)