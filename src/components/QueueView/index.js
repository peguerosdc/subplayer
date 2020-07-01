// Redux
import { connect } from "react-redux"
import { clearQueue, removeSongsFromQueue, seekToSongInQueue  } from "../../redux/actions/songsActions"
import { getSongsInQueueSelector } from '../../redux/selectors/musicPlayerSelector'
// UI
import QueueView from './QueueView'

const mapStateToProps = (state, ownProps) => {
    return {
        "songs" : getSongsInQueueSelector(state, ownProps)
    }
}

const mapDispatchToProps = { clearQueue, removeSongsFromQueue, seekToSongInQueue }

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(QueueView)