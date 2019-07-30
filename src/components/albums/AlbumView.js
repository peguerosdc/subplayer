import React from "react";
import Album from './Album'

class AlbumView extends React.Component {

    render() {
        const albumId = this.props.albumId
        return (
            <div style={{padding:"20px"}}>
                <Album albumId={albumId} style={{margin:"10px"}}/>
            </div>
        )
    }
}

export default AlbumView