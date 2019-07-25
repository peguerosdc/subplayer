import React from 'react';
import { connect } from "react-redux";
import PropTypes from 'prop-types'
// UI
import { Grid, Row, Col, Input, InputGroup, Icon, Button } from 'rsuite';
import "./sidebar.less"

class Sidebar extends React.Component {

    constructor(props) {
        super(props)
        this.state = { path : window.location.pathname }
    }

    navigateTo = (link) => {
        this.setState({ path : link })
        this.props.onNavigateTo && this.props.onNavigateTo(link)
    }

    isSelected = (link) => this.state.path.startsWith(link)

    showCreatePlaylistModal = () => {
        this.props.onCreatePlaylistTrigger && this.props.onCreatePlaylistTrigger()
    }

    onLogOut = () => {
        this.props.onLogOut && this.props.onLogOut()
    }

    render() {
        const playlists = this.props.playlists
        return (
            <Grid fluid style={{padding:"10px", display:"flex", flexDirection:"column", height:"100%"}}>

                <InputGroup inside size="lg" style={{display:"none"}}>
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
                <Button appearance="link" block={true} onClick={this.onLogOut}>Log out</Button>
            </Grid>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        "playlists" : state.playlists.byId,
    }
}

Sidebar.propTypes = {
    onNavigateTo : PropTypes.func,
    onCreatePlaylistTrigger : PropTypes.func,
    onLogOut : PropTypes.func
}

export default connect(
    mapStateToProps,
    null
)(Sidebar)