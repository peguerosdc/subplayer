import React from 'react';
import { connect } from "react-redux";
import { navigate } from "@reach/router";
import { loadPlaylists } from "../../redux/actions/playlistsActions";
// UI
import { Grid, Row, Col, Input, InputGroup, Icon } from 'rsuite';
import "./sidebar.less"

class Sidebar extends React.Component {

    constructor(props) {
        super(props)
        this.state = { path : window.location.pathname }
    }

    componentDidMount() {
        this.props.loadPlaylists()
    }

    navigateTo = (link) => {
        navigate(link)
        this.setState({ path : window.location.pathname })
    }

    isSelected = (link) => window.location.pathname.startsWith(link)

    render() {
        let playlists = this.props.playlists.playlists
        return (
            <Grid fluid style={{padding:"10px"}}>

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
            </Grid>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        "playlists" : state.playlists
    }
}
const mapDispatchToProps = { loadPlaylists }

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Sidebar)