import React from "react"
import PropTypes from 'prop-types'
// Redux
import { connect } from "react-redux"
import { search } from "../../redux/actions/searchActions"
import { searchSongsSelector } from '../../redux/selectors/searchSelectors'
// Results
import {AlbumResult} from "./results/AlbumResult"
import {ArtistElement} from "../artists/ArtistsList/ArtistElement/ArtistElement"
import {SongsResult} from "./results/SongsResult"
// UI
import { ConnectedSearchBar } from "./SearchBar"
import { Col } from 'rsuite'

export class SearchView extends React.Component {

    render() {
        const albums = this.props.albums || []
        const artists = this.props.artists || []
        const songs = this.props.songs || []
        return (
            <div style={{padding:"20px", display:"flex", flexDirection:"column", height:"100%", overflow:"auto"}}>
                <Col className="rs-hidden-lg rs-hidden-md">
                    <ConnectedSearchBar />
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
                                { artists.map( a => <ArtistElement artist={a}/> )}
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

const mapStateToProps = (state, ownProps) => {
    return {
        "artists" : state.search.artists,
        "albums" : state.search.albums,
        "songs" : searchSongsSelector(state)
    }
}

const mapDispatchToProps = { search }

SearchView.propTypes = {
    "artists" : PropTypes.array,
    "albums" : PropTypes.array,
    "songs" : PropTypes.array,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchView)