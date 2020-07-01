// Redux
import { connect } from "react-redux"
import { loadOneArtist } from "../../redux/actions/artistsActions"
// UI
import Artist from './Artist'

const mapStateToProps = (state, props) => {
    return {
        artist : state.artists.byId[props.artistId],
    }
}

const mapDispatchToProps = { loadOneArtist }

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Artist)