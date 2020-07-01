// Redux
import { connect } from "react-redux"
import { getAlbumsOfArtist } from "../../redux/selectors/albumSelectors"
// UI
import ArtistByAlbums from './ArtistByAlbums'

const mapStateToProps = (state, props) => {
    return {
        albums : getAlbumsOfArtist(state, props),
    }
}

export default connect(
    mapStateToProps,
    null
)(ArtistByAlbums)