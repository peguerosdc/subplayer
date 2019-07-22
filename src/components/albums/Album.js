import React from "react";
import { connect } from "react-redux";
import subsonic from "../../api/subsonicApi";
// UI
import { FlexboxGrid, Panel } from 'rsuite';
import SongsTable from '../songs/SongsTable'

class Album extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = { album : {}}
    }

    async componentDidMount() {
        await this.loadAlbum(this.props.albumId)
    }

    loadAlbum = async (id) => {
        const album = await subsonic.getAlbum(id)
        this.setState({album : album})
    }

    render() {
        const album = this.state.album
        const songs = album ? album.song : []
        // Render all
        return (
            <Panel bordered style={{backgroundColor:"white"}}>
                <FlexboxGrid>
                    <FlexboxGrid.Item colspan={6}>
                        <img src={subsonic.getCoverArtUrl(album.coverArt ? album.coverArt : "")} alt="Album Cover" width="100%" />
                    </FlexboxGrid.Item>
                    <FlexboxGrid.Item colspan={18} style={{paddingLeft:"10px"}}>
                        <h2>{album ? album.name : "..."}</h2>
                        <SongsTable songs={songs} columns={[SongsTable.columns.title, SongsTable.columns.duration, SongsTable.columns.bitRate, SongsTable.columns.options]} />
                    </FlexboxGrid.Item>
                </FlexboxGrid>
            </Panel>
        )
    }
}

export default connect(
    null,
    null
)(Album)