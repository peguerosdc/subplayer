import React from "react";
// Redux
import { connect } from "react-redux";
import { loadAlbum } from "../../redux/actions/albumActions";
// UI
import Album from './Album'

class AlbumView extends React.Component {

    componentDidMount() {
        this.props.loadAlbum(this.props.albumId)
    }

    render() {
        const albumId = this.props.albumId
        return (
            <div style={{padding:"20px"}}>
                <Album albumId={albumId} />
            </div>
        )
    }
}

const mapDispatchToProps = { loadAlbum }

export default connect(
    null,
    mapDispatchToProps
)(AlbumView)