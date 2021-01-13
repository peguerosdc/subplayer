// Redux
import { connect } from "react-redux"
import {beginAsyncTask, asyncTaskSuccess, asyncTaskError } from "../../redux/actions/apiStatusActions"
// UI
import GenresPicker from './GenresPicker'

const mapDispatchToProps = { beginAsyncTask, asyncTaskSuccess, asyncTaskError }

export default connect(
    null,
    mapDispatchToProps
)(GenresPicker)