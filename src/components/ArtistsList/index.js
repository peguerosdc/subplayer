// Redux
import { connect } from "react-redux"
import { loadArtists } from "../../redux/actions/artistsActions"
import { getArtistsWithHeaders } from "../../redux/selectors/artistSelectors"
// UI
import {ArtistsList} from './ArtistsList'

const mapStateToProps = (state) => {
    return {
        artists: getArtistsWithHeaders(state),
    }
}

const mapDispatchToProps = { loadArtists }

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ArtistsList)