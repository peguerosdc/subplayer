import React from "react";
import { navigate } from "@reach/router"
import PropTypes from 'prop-types'
// Redux
import { connect } from "react-redux";
import { deletePlaylist } from "../../../redux/actions/playlistsActions";
// UI
import { Button, Modal, Icon } from 'rsuite';

class DeletePlaylistModal extends React.Component {

    constructor(props) {
        super(props)
        this.waitingForDeletion = false
    }

    componentDidUpdate(prevProps) {
        // Check if the playlist was deleted: it doesnt exist and we dispatched a deletion request
        // Alternative: Navigate on deletion without waiting for confirmation
        if(!this.props.playlist && this.waitingForDeletion ) {
            navigate("/")
        }
    }

    closeModalAndDelete = () => {
        this.waitingForDeletion = true
        this.props.deletePlaylist( this.props.playlist )
        this.props.onHide && this.props.onHide()
    }

    closeDeleteModal = () => {
        this.props.onHide && this.props.onHide()
    }

    render() {
        return (
            <Modal {...this.props} className="subplayer-modal" backdrop="static" onHide={this.closeDeleteModal} size="xs">
                <Modal.Body>
                    <Icon icon="remind" style={{ color: '#ffb300', fontSize: 24 }} />
                    {'  '}
                    Once a playlist is deleted, it can't be recovered. Are you sure you want to proceed?
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.closeModalAndDelete} appearance="primary"> Ok </Button>
                    <Button onClick={this.closeDeleteModal} appearance="subtle"> Cancel </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

// Properties
DeletePlaylistModal.propTypes = {
    onHide: PropTypes.func,
    playlistId : PropTypes.string.isRequired
}

// Redux
const mapStateToProps = (state, ownProps) => {
    return {
        "playlist" : state.playlists.byId[ownProps.playlistId],
    }
}

const mapDispatchToProps = { deletePlaylist }

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DeletePlaylistModal)