import React from "react";
import { connect } from "react-redux";
import subsonic from "../../api/subsonicApi";
import Album from '../albums/Album'
import { beginApiCall, apiCallSuccess } from "../../redux/actions/apiStatusActions"

class Artist extends React.Component {

    constructor(props) {
        super(props)
        this.state = { artist : {}}
    }

    async componentDidMount() {
        await this.loadArtist(this.props.artistId)
    }

    loadArtist = async (id) => {
        this.props.beginApiCall()
        const artist = await subsonic.getArtist(id)
        this.setState({artist : artist})
        this.props.apiCallSuccess()
    }

    render() {
        const artist = this.state.artist
        const albums = artist && artist.album ? artist.album : []
        return (
            <div style={{padding:"20px", height:"100%", overflow:"auto"}}>
                <h1 style={{color:"white", fontWeight: "bold"}}>{artist != null ? artist.name : "..."}</h1>
                {albums.map(album => ( <Album key={album.id} albumId={album.id} style={{marginTop:"10px", marginBottom:"10px"}}/> ))}
            </div>
        )
    }
}

const mapDispatchToProps = { beginApiCall, apiCallSuccess }

export default connect(
    null,
    mapDispatchToProps
)(Artist)