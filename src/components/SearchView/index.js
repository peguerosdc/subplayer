// Redux
import { connect } from "react-redux"
import { search } from "../../redux/actions/searchActions"
import { searchSongsSelector } from '../../redux/selectors/searchSelectors'
// UI
import SearchView from './SearchView'

const mapStateToProps = (state, ownProps) => {
    return {
        "artists" : state.search.artists,
        "albums" : state.search.albums,
        "songs" : searchSongsSelector(state)
    }
}

const mapDispatchToProps = { search }


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchView)