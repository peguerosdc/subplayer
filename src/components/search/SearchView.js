import React from "react"
import PropTypes from 'prop-types'
import { navigate } from "@reach/router"
// Redux
import { connect } from "react-redux"
import { search } from "../../redux/actions/searchActions"
import { getSongCurrentlyPlayingSelector } from '../../redux/selectors/musicPlayerSelector'
import { searchSongsSelector } from '../../redux/selectors/searchSelectors'
// Results
import {AlbumResult} from "./results/AlbumResult"
import {ArtistResult} from "./results/ArtistResult"
import {SongsResult} from "./results/SongsResult"
// UI
import { ConnectedSearchBar } from "./SearchBar"
import { Col } from 'rsuite'

export class SearchView extends React.Component {

    render() {
        const currentArtistPlayingId = this.props.currentSongPlaying && this.props.currentSongPlaying.artistId
        const albums = this.props.albums || []
        const artists = this.props.artists || []
        const songs = this.props.songs || []
        return (
            <div style={{padding:"20px", display:"flex", flexDirection:"column", height:"100%", overflow:"auto"}}>
                <Col className="rs-hidden-lg rs-hidden-md">
                    <ConnectedSearchBar />
                </Col>

                {
                    (artists.length === 0 && albums.length === 0 && songs.length === 0)
                    ? <h1>No results</h1>
                    : null
                }

                {
                    artists.length > 0 ? (
                        <>
                            <h1 className="artists_list_title">Artists</h1>
                            <div style={{display:"flex", flexDirection:"row", flexWrap:"wrap"}}>
                                { artists.map( a =>
                                    <Col key={a.id} sm={6} xs={12} className={currentArtistPlayingId === a.id ? "link_to_artist playing" : "link_to_artist"} onClick={ (e) => {navigate("/artists/"+a.id)} }>
                                        <ArtistResult artist={a}/>
                                    </Col>
                                )}
                            </div>
                        </>
                    ) : null
                }
                
                {
                    albums.length > 0 ? (
                        <>
                            <h1 className="artists_list_title">Albums</h1>
                            <div style={{display:"flex", flexDirection:"row", flexWrap:"wrap"}}>
                                { albums.map( a =>
                                    <Col key={a.id} sm={6} xs={12}>
                                        <AlbumResult album={a} />
                                    </Col>
                                )}
                            </div>
                        </>
                    ) : null
                }

                {
                    songs.length > 0 ? (
                        <>
                            <h1 className="artists_list_title">Songs</h1>
                            <SongsResult songs={songs} />
                        </>
                    ) : null
                }

            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        "artists" : state.search.artists,
        "albums" : state.search.albums,
        "songs" : searchSongsSelector(state),
        currentSongPlaying : getSongCurrentlyPlayingSelector(state),
    }
}

const mapDispatchToProps = { search }

SearchView.propTypes = {
    "artists" : PropTypes.array,
    "albums" : PropTypes.array,
    "songs" : PropTypes.array,
    currentSongPlaying : PropTypes.object
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchView)