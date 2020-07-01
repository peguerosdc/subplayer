import React from "react"
import PropTypes from 'prop-types'
// Results
import AlbumResult from "../SearchAlbumResult"
import ArtistElement from "../ArtistListElement"
import SongsResult from "../SearchSongResult"
// UI
import SearchBar from "../SearchBar"
import { Col } from 'rsuite'

export default class SearchView extends React.Component {

    render() {
        const albums = this.props.albums || []
        const artists = this.props.artists || []
        const songs = this.props.songs || []
        return (
            <div style={{padding:"20px", display:"flex", flexDirection:"column", height:"100%", overflow:"auto"}}>
                <Col className="rs-hidden-lg rs-hidden-md">
                    <SearchBar />
                </Col>

                {
                    /* Case where there are no results */
                    (artists.length === 0 && albums.length === 0 && songs.length === 0)
                    ? <h1>No results</h1>
                    : null
                }

                {
                    /* Artists section */
                    artists.length > 0 ? (
                        <>
                            <h1 style={{display:"contents"}}>Artists</h1>
                            <div style={{display:"flex", flexDirection:"row", flexWrap:"wrap"}}>
                                { artists.map( a => <ArtistElement key={a.id} artist={a}/> )}
                            </div>
                        </>
                    ) : null
                }
                
                {
                    albums.length > 0 ? (
                        <>
                            <h1 style={{display:"contents"}}>Albums</h1>
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
                            <h1 style={{display:"contents"}}>Songs</h1>
                            <SongsResult songs={songs} />
                        </>
                    ) : null
                }

            </div>
        )
    }
}

SearchView.propTypes = {
    "artists" : PropTypes.array,
    "albums" : PropTypes.array,
    "songs" : PropTypes.array,
}
