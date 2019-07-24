import React from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types'
import { navigate } from "@reach/router";
import { loadPlaylists, createPlaylist } from "../../redux/actions/playlistsActions";
import { logout } from "../../redux/actions/authActions";
// UI
import { Grid, Row, Col, Input, InputGroup, Icon, Button, Modal, Form, FormGroup, FormControl, ControlLabel } from 'rsuite';
import "./sidebar.less"

class Sidebar extends React.Component {

    constructor(props) {
        super(props)
        this.newPlaylist = {name:""}
        this.state = { path : window.location.pathname, showModal : false, playlistNameErrorMessage : null }
    }

    componentDidMount() {
        this.props.loadPlaylists()
    }

    navigateTo = (link) => {
        navigate(link)
        this.setState({ path : link })
        if( this.props.onNavigatedTo ){
            this.props.onNavigatedTo(link)
        }
    }

    isSelected = (link) => this.state.path.startsWith(link)

    showCreatePlaylistModal = () => {
        this.setState({showModal:true})
    }

    closeModalAndCreate = () => {
        if( this.newPlaylist.name.length > 0 ) {
            this.setState({showModal:false, playlistNameErrorMessage : null})
            this.props.createPlaylist( this.newPlaylist.name )
        }
        else {
            this.setState({playlistNameErrorMessage : "Name required"})
        }
    }

    closeModal = () => {
        this.setState({showModal:false})
    }

    onPlaylistFormChange = (value) => {
        this.newPlaylist = value
    }

    render() {
        let playlists = this.props.playlists.byId
        return (
            <Grid fluid style={{padding:"10px", display:"flex", flexDirection:"column", height:"100%"}}>

                <InputGroup inside size="lg">
                    <Input placeholder="Search" />
                    <InputGroup.Button><Icon icon="search" /></InputGroup.Button>
                </InputGroup>

                <h3 className="title">LIBRARY</h3>
                <Row>
                    <Col md={24} className={this.isSelected("/artists") ? "selectableRow selected" : "selectableRow"} onClick={() => this.navigateTo("/artists/")}>
                        Artists
                    </Col>
                </Row>

                <h3 className="title">PLAYLISTS</h3>
                {
                    Object.keys(playlists).map( id =>
                        <Row key={id}>
                            <Col md={24} className={this.isSelected("/playlist/"+id) ? "selectableRow selected" : "selectableRow"} onClick={() => this.navigateTo("/playlist/"+id)}>
                                {playlists[id].name} ({playlists[id].songCount})
                            </Col>
                        </Row>
                    )
                }
                <div style={{flexGrow:1}} />
                <Button appearance="ghost" block={true} onClick={this.showCreatePlaylistModal} >Create new playlist</Button>
                <Button appearance="link" block={true} onClick={this.props.logout}>Log out</Button>
                {/* Playlist creation modal */}
                <Modal backdrop="static" show={this.state.showModal} onHide={this.closeModal} size="xs">
                    <Modal.Header>
                        <Modal.Title>New Playlist</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form fluid onChange={this.onPlaylistFormChange}>
                            <FormGroup>
                                <ControlLabel>Name</ControlLabel>
                                <FormControl name="name" errorMessage={this.state.playlistNameErrorMessage} errorPlacement="bottomLeft" />
                            </FormGroup>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.closeModalAndCreate} appearance="primary"> Create </Button>
                        <Button onClick={this.closeModal} appearance="subtle"> Cancel </Button>
                    </Modal.Footer>
                </Modal>
            </Grid>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        "playlists" : state.playlists,
    }
}
const mapDispatchToProps = { loadPlaylists, createPlaylist, logout }

Sidebar.propTypes = {
    onNavigatedTo : PropTypes.func
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Sidebar)