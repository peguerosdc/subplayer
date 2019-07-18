import React from "react";
import { connect } from "react-redux";
import { loadAlbum } from "../../redux/actions/albumActions";
import { FlexboxGrid, Panel, Paragraph } from 'rsuite';
import * as subsonicApi from "../../api/subsonicApi";

class Album extends React.Component {
    
    componentDidMount() {
        this.props.loadAlbum(this.props.albumId)
    }

    render() {
        const album = this.props.album
        const songs = album ? album.song : []
        return (
            <Panel header={<h3>{album ? album.name : "..."}</h3>} bordered style={{backgroundColor:"white"}}>
                <FlexboxGrid>
                    <FlexboxGrid.Item colspan={6}>
                        <img src={subsonicApi.getCoverArtUrl(album ? album.coverArt : "")} alt="Album Cover" width="100%" />
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item colspan={18}>
                        <ul>
                            {songs.map(song => (
                                <li key={song.id}>{song.title}</li>
                            ))}
                        </ul>
                    </FlexboxGrid.Item>
                </FlexboxGrid>
            </Panel>
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