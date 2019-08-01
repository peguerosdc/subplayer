import React from "react";
import { connect } from "react-redux";
import Album from './Album'
import { clearAlbums } from "../../redux/actions/albumActions"

class AlbumView extends React.Component {

    componentDidMount() {
        this.props.clearAlbums()
    }

    render() {
        const albumId = this.props.albumId
        return (
            <div style={{padding:"20px"}}>
                <Album albumId={albumId} style={{margin:"10px"}}/>
            </div>
        )
    }
}

const mapDispatchToProps = { clearAlbums }

export default connect(
    null,
    mapDispatchToProps
)(AlbumView)