import React from "react";
import { connect } from "react-redux";
import { loadArtist } from "../../redux/actions/artistsActions";
import Album from '../albums/Album'

class Artist extends React.Component {
    
    componentDidMount() {
        this.props.loadArtist(this.props.artistId)
    }

    render() {
        let artist = this.props.artist
        let albums = this.props.artist != null ? this.props.artist.album : []
        return (
            <div>
                <h1>This is artist {artist != null ? artist.name : "..."}</h1>
                {albums.map(album => (
                    <Album albumId={album.id} key={album.id} />
                ))}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        "artist" : state.artistContent.currentArtist
    }
}

const mapDispatchToProps = { loadArtist }


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Artist)