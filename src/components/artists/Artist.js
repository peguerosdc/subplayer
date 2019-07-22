import React from "react";
import { connect } from "react-redux";
import subsonic from "../../api/subsonicApi";
import Album from '../albums/Album'
import { FlexboxGrid } from 'rsuite';

class Artist extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = { artist : {}}
    }

    async componentDidMount() {
        await this.loadArtist(this.props.artistId)
    }

    loadArtist = async (id) => {
        const album = await subsonic.getArtist(id)
        this.setState({artist : album})
    }

    render() {
        const artist = this.state.artist
        const albums = artist && artist.album ? artist.album : []
        return (
            <div style={{padding:"20px"}}>
                <h1 style={{color:"white", fontWeight: "bold"}}>{artist != null ? artist.name : "..."}</h1>
                <FlexboxGrid>
                    {albums.map(album => (
                        <FlexboxGrid.Item colspan={24} key={album.id}>
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

export default connect(
    null,
    null
)(Artist)