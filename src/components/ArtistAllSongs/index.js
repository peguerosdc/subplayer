// Redux
import { connect } from "react-redux"
import { songsOfArtistSelector } from '../../redux/selectors/songSelectors'
// UI
import ArtistAllSongs from './ArtistAllSongs'

const mapStateToProps = (state, props) => {
    return {
        songs: songsOfArtistSelector(state, props),
    }
}

export default connect(
    mapStateToProps,
    null
)(ArtistAllSongs)