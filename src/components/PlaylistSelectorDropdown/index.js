// Redux
import { connect } from "react-redux"
// UI
import PlaylistSelectorDropdown from './PlaylistSelectorDropdown'

const mapStateToProps = (state) => {
    return {
        "playlists" : state.playlists.byId,
    }
}

export default connect(
    mapStateToProps,
    null
)(PlaylistSelectorDropdown)