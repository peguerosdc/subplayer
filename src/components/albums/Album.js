import React from "react";
import { connect } from "react-redux";
import { loadAlbum } from "../../redux/actions/albumActions";

class Album extends React.Component {
    
    componentDidMount() {
        this.props.loadAlbum(this.props.albumId)
    }

    render() {
        const album = this.props.album
        const songs = album ? album.song : []
        return (
            <div>
                <h2>{album ? album.name : "..."}</h2>
                <ul>
                    {songs.map(song => (
                        <li key={song.id}>{song.title}</li>
                    ))}
                </ul>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        "album" : state.albumsContent.albums.find(a => a.id === ownProps.albumId )
    }
}

const mapDispatchToProps = { loadAlbum }


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Album)