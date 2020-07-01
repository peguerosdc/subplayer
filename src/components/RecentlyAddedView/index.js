// Redux
import { connect } from "react-redux"
import {beginAsyncTask, asyncTaskSuccess, asyncTaskError } from "../../redux/actions/apiStatusActions"
// UI
import RecentlyAddedView from './RecentlyAddedView'

const mapDispatchToProps = { beginAsyncTask, asyncTaskSuccess, asyncTaskError }

export default connect(
    null,
    mapDispatchToProps
)(RecentlyAddedView)