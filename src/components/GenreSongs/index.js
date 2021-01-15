// Redux
import { connect } from "react-redux"
import { loadSongsOfGenre } from "../../redux/actions/genresActions"
import { songsOfGenreSelector } from '../../redux/selectors/songSelectors'
// UI
import GenreSongs from './GenreSongs'

const mapStateToProps = (state, ownProps) => {
    return {
        "songs" : songsOfGenreSelector(state, ownProps)
    }
}

const mapDispatchToProps = { loadSongsOfGenre }

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GenreSongs)