import React from "react";
import { loadArtists } from "../../redux/actions/artistsActions";
import { connect } from "react-redux";
// UI
import "./ArtistsList.less"
import { Grid, Row, Col, Icon } from 'rsuite';

class ArtistsList extends React.Component {
    
    componentDidMount() {
        if( this.props.artists.length === 0 ) {
            this.props.loadArtists();
        }
    }

    render() {
        const currentArtistPlayingId = this.props.currentArtistPlayingId
        return (
            <Grid fluid style={{padding:"20px"}}>
                <Row className="artists_list_title">
                    <Col md={24}>
                        <h1>All artists</h1>
                    </Col>
                </Row>
                {this.props.artists.map(a => (
                    <React.Fragment key={a.name}>
                        <Row className="link_to_artist_header" style={{marginTop:"20px", marginBottom:"6px"}}>
                            <Col md={24}>
                                <h2>{a.name}</h2>
                            </Col>
                        </Row>
                        <Row>
                            {a.artist.map(artist => (
                                <Col key={artist.id} sm={8} xs={12} className={currentArtistPlayingId === artist.id ? "link_to_artist playing" : "link_to_artist"} onClick={ (e) => {this.props.navigate("/artists/"+artist.id)} }>
                                    {artist.name} <Icon icon='volume-up' />
                                </Col>
                            ))}
                        </Row>
                    </React.Fragment>
                ))}
            </Grid>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        artists: state.artistContent.artists,
        currentArtistPlayingId : state.songs.current ? state.songs.current.artistId : null
    }
}

const mapDispatchToProps = { loadArtists }


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ArtistsList)