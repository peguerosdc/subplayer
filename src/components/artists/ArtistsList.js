import React from "react";
import { loadArtists } from "../../redux/actions/artistsActions";
import { connect } from "react-redux";
import { Link } from "@reach/router";

class ArtistsList extends React.Component {
    
    componentDidMount() {
        if( this.props.artists.length === 0 ) {
            this.props.loadArtists();
        }
    }

    render() {
        return (
            <div>
                <h1>List of artists</h1>
                {this.props.artists.map(a => (
                    <React.Fragment key={a.name}>
                        <h2>{a.name}</h2>
                        <ul>
                            {a.artist.map(artist => (
                                <li key={artist.id}><Link to={"/artists/"+artist.id}>{artist.name}</Link></li>
                            ))}
                        </ul>
                    </React.Fragment>
                ))}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        artists: state.artistContent.artists,
    }
}

const mapDispatchToProps = { loadArtists }


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ArtistsList)