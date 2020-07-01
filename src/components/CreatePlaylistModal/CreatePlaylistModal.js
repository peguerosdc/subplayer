import React from 'react'
import PropTypes from 'prop-types'
// UI
import { Button, Modal, Form, FormGroup, FormControl, ControlLabel } from 'rsuite'

export default class CreatePlaylistModal extends React.Component {

    constructor(props) {
        super(props)
        this.state = { playlistNameErrorMessage : null }
        this.newPlaylist = {name : ""}
    }

    closeModal = () => {
        this.props.onClosePlaylistModal && this.props.onClosePlaylistModal()
    }

    onPlaylistFormChange = (value) => {
        this.newPlaylist = value
    }

    closeModalAndCreate = () => {
        if( this.newPlaylist.name.length > 0 ) {
            this.setState({playlistNameErrorMessage : null})
            this.props.createPlaylist( this.newPlaylist.name )
            this.closeModal()
        }
        else {
            this.setState({playlistNameErrorMessage : "Name required"})
        }
    }

    handleKeyDown = (e) => {
        if( e.key === "Enter" ) {
            this.closeModalAndCreate()
        }
    }

    render() {
        return (
            <Modal id="modal" backdrop="static" show={this.props.showModal} onHide={this.closeModal} size="xs">
                <Modal.Header>
                    <Modal.Title>New Playlist</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form fluid onChange={this.onPlaylistFormChange}>
                        <FormGroup>
                            <ControlLabel>Name</ControlLabel>
                            <FormControl name="name" errorMessage={this.state.playlistNameErrorMessage} errorPlacement="bottomStart" onKeyDown={this.handleKeyDown} />
                        </FormGroup>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button id="create_playlist" onClick={this.closeModalAndCreate} appearance="primary"> Create </Button>
                    <Button id="close" onClick={this.closeModal} appearance="subtle"> Cancel </Button>
                </Modal.Footer>
            </Modal>    
        )
    }
}

CreatePlaylistModal.propTypes = {
    showModal : PropTypes.bool.isRequired,
    onClosePlaylistModal : PropTypes.func,
    createPlaylist : PropTypes.func.isRequired,
}

CreatePlaylistModal.defaultProps = {
    showModal : false,
    createPlaylist : () => (null),
}
