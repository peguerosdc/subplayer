import React from 'react';
import { connect } from "react-redux";
import { Link } from "@reach/router";
import { Input } from 'rsuite';
import { loadPlaylists } from "../redux/actions/playlistsActions";

class Sidebar extends React.Component {

    componentDidMount() {
        this.props.loadPlaylists()
    }

    render() {
        let playlists = this.props.playlists.playlists
        return (
            <div>
                <Input placeholder="Search" size="lg"/>

                <h2>LIBRARY</h2>
                <Link to="/artists/">Artists</Link>

                <h2>PLAYLISTS</h2>
                {
                    Object.keys(playlists).map( id =>
                        <p key={id}>{playlists[id].name} ({playlists[id].songCount})</p>
                    )
                }
            </div>
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