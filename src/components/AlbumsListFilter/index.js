// Redux
import { connect } from "react-redux"
import {beginAsyncTask, asyncTaskSuccess, asyncTaskError } from "../../redux/actions/apiStatusActions"
// UI
import AlbumsListFilter from './AlbumsListFilter'

const mapDispatchToProps = { beginAsyncTask, asyncTaskSuccess, asyncTaskError }

export default connect(
    null,
    mapDispatchToProps
)(AlbumsListFilter)