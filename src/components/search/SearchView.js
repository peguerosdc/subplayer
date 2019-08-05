import React from "react"
import { navigate } from "@reach/router"
// Redux
import { connect } from "react-redux"
import { search } from "../../redux/actions/searchActions"
import { getSongCurrentlyPlayingSelector } from '../../redux/selectors/musicPlayerSelector'
// Utils
import subsonic from "../../api/subsonicApi"
// UI
import { ConnectedSearchBar } from "./SearchBar"
import SongsTable from '../songs/SongsTable'
import SongsTableEnhanced from '../songs/SongsTableEnhanced'
import { Col, Icon } from 'rsuite'

const SONG_COLUMNS_TO_SHOW = [SongsTable.columns.selectable, SongsTable.columns.title, SongsTable.columns.artist, SongsTable.columns.album, SongsTable.columns.duration, SongsTable.columns.bitRate, SongsTable.columns.download]

function AlbumElement(props) {
    const album = props.album
    return (
        <div style={{display:"flex", flexDirection:"column", alignItems:"center", textAlign:"center"}}>
            <div
                style={{
                    width: 100,
                    height: 100,
                    background: '#f5f5f5',
                    borderRadius: "50%",
                    overflow: 'hidden',
                    display: 'inline-block'
                }}>
                <img alt="" src={album.coverArt ? subsonic.getCoverArtUrl(album.coverArt) : "album_placeholder.jpg"} width="100" />
            </div>
            {`"${album.name}" by "${album.artist}"`}
        </div>
    )
}

class SearchView extends React.Component {

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
                                        {a.name} <Icon icon='volume-up' />
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
                                    <Col className="link_to_artist" key={a.id} sm={6} xs={12} onClick={ (e) => {navigate("/album/"+a.id)} }>
                                        <AlbumElement album={a} />
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
                            <SongsTableEnhanced style={{marginBottom:"20px"}} songs={songs} columns={SONG_COLUMNS_TO_SHOW} sortable={true} />
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
        "songs" : state.search.songs,
        currentSongPlaying : getSongCurrentlyPlayingSelector(state),
    }
}

const mapDispatchToProps = { search }


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchView)