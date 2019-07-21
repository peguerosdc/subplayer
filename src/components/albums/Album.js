import React from "react";
import { connect } from "react-redux";
import { loadAlbum } from "../../redux/actions/albumActions";
import * as subsonicApi from "../../api/subsonicApi";
// UI
import { FlexboxGrid, Panel } from 'rsuite';
import SongsTable from '../songs/SongsTable'

class Album extends React.Component {
    
    componentDidMount() {
        this.props.loadAlbum(this.props.albumId)
    }

    render() {
        const album = this.props.album
        const songs = album ? album.song : []
        // Build header
        const header = (
            <FlexboxGrid align="middle">
                <FlexboxGrid.Item colspan={4}>
                    <img src={subsonicApi.getCoverArtUrl(album ? album.coverArt : "")} alt="Album Cover" width="100%" />
                </FlexboxGrid.Item>
                <FlexboxGrid.Item colspan={20}>
                    <h3>{album ? album.name : "..."}</h3>
                </FlexboxGrid.Item>
            </FlexboxGrid>
        )
        // Render all
        return (
            <Panel header={header} bordered style={{backgroundColor:"white"}}>
                <SongsTable songs={songs} columns={[SongsTable.columns.title, SongsTable.columns.duration, SongsTable.columns.options]} />
            </Panel>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        "album" : state.albumsContent[ownProps.albumId]
    }
}

const mapDispatchToProps = { loadAlbum }


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Album)