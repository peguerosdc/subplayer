import React from "react";
import { connect } from "react-redux";
import { loadArtist } from "../../redux/actions/artistsActions";
import Album from '../albums/Album'
import { FlexboxGrid } from 'rsuite';

class Artist extends React.Component {
    
    componentDidMount() {
        this.props.loadArtist(this.props.artistId)
    }

    render() {
        let artist = this.props.artist
        let albums = artist && artist.album ? artist.album : []
        return (
            <div style={{padding:"20px"}}>
                <h1>{artist != null ? artist.name : "..."}</h1>
                <FlexboxGrid>
                    {albums.map(album => (
                        <FlexboxGrid.Item colspan={12} key={album.id}>
                            <div style={{margin:"10px"}}>
                                <Album albumId={album.id}/>
                            </div>
                        </FlexboxGrid.Item>
                    ))}
                </FlexboxGrid>
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