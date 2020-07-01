// Redux
import { connect } from "react-redux"
import { loadFavouriteSongs, setStarOnSongs } from "../../redux/actions/favouritesActions"
import { favouriteSongsSelector } from '../../redux/selectors/songSelectors'
// UI
import FavouritesView from './FavouritesView'

const mapStateToProps = (state, ownProps) => {
    return {
        "songs" : favouriteSongsSelector(state)
    }
}

const mapDispatchToProps = { loadFavouriteSongs, setStarOnSongs }

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FavouritesView)