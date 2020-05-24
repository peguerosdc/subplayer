import React from "react"
import { navigate } from "@reach/router"
import PropTypes from 'prop-types'
// Redux
import { connect } from "react-redux"
import { deletePlaylist } from "../../../redux/actions/playlistsActions"
// UI
import { Button, Modal, Icon, Input } from 'rsuite'

export class DeletePlaylistModal extends React.Component {

    constructor(props) {
        super(props)
        this.waitingForDeletion = false
        this.state = {deleteNameError : false}
        this.confirmation_name = ""
    }

    componentDidUpdate(prevProps) {
        // Check if the playlist was deleted: it doesnt exist and we dispatched a deletion request
        // Alternative: Navigate on deletion without waiting for confirmation
        if(!this.props.playlist && this.waitingForDeletion ) {
            navigate("/")
        }
    }

    closeModalAndDelete = () => {
        // validate playlist name
        if( this.confirmation_name === this.props.playlist.name ) {
            this.waitingForDeletion = true
            this.props.deletePlaylist(this.props.playlist)
            this.closeDeleteModal()
        }
        else {
            this.setState({deleteNameError : true})
        }
    }

    closeDeleteModal = () => {
        this.props.onHide && this.props.onHide()
    }

    render() {
        const playlistToDelete = this.props.playlist || {}
        return (
            <Modal {...this.props} className="subplayer-modal" backdrop="static" onHide={this.closeDeleteModal} size="xs">
                <Modal.Body>
                    <Icon icon="remind" style={{ color: '#ffb300', fontSize: 24 }} />
                    {'  '}
                    Once a playlist is deleted, it can't be recovered. If you want to proceed, write the name of the playlist "<b>{playlistToDelete.name}</b>":
                    <Input id="confirm_name" name="confirm_name" onChange={(value => {this.confirmation_name = value})} style={{width:"100%", marginTop:"10px"}} />
                    {this.state.deleteNameError ? <span id="errorMessage" style={{color:"red"}}>Name does not match</span> : null}
                </Modal.Body>
                <Modal.Footer>
                    <Button id="deleteButton" onClick={this.closeModalAndDelete} appearance="primary"> Ok </Button>
                    <Button id="cancelButton" onClick={this.closeDeleteModal} appearance="subtle"> Cancel </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

// Properties
DeletePlaylistModal.propTypes = {
    onHide: PropTypes.func,
    deletePlaylist: PropTypes.func.isRequired,
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