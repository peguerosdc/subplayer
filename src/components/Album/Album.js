import React from "react"
import PropTypes from 'prop-types'
import { navigate } from "@reach/router"
// Utils
import subsonic from "../../api/subsonicApi"
import { seconds_to_hhmmss } from "../../utils/formatting.js"
// UI
import { Grid, Row, Col, Panel, IconButton, Icon } from 'rsuite'
import SongsTable from '../SongsTable/SongsTable'
import SongsTableEnhanced from '../SongsTableEnhanced'
import "./Album.less"

const COLUMNS_TO_SHOW = [SongsTable.columns.title, SongsTable.columns.duration, SongsTable.columns.bitRate, SongsTable.columns.selectable, SongsTable.columns.download]

export default function Album(props) {
    const { album, songs, style, starAlbums, linkArtist } = props
    // Toggle the star on this album
    function starThisAlbum() {
        starAlbums([album], !album.starred)
    }

    function goToArtist(artistId) {
        navigate(`/artists/${artistId}`)
    }
    // Render all
    const starStyle = album.starred ? 'primary' : 'default'
    const starIcon = album.starred ? 'star' : 'star-o'
    return (
        <Panel shaded bordered className="rs-table album-panel" style={{...style}}>
            <Grid fluid>
                <Row>
                    <Col smHidden xsHidden md={6} lg={6}>
                        <img src={album.coverArt ? subsonic.getCoverArtUrl(album.coverArt) : null} alt="Album Cover" width="100%" style={{marginBottom:"5px"}} />
                        <IconButton id="starAlbumLG" icon={<Icon icon="star" />} circle size="lg" style={{marginTop:"-30px", marginRight:"10px", float:"right"}} appearance={starStyle} onClick={starThisAlbum}/>
                        {linkArtist && <p><strong>By: </strong> <span className="artist-link" onClick={e => goToArtist(album.artistId)}>{album.artist}</span> </p> }
                        <p><strong>Genre: </strong> {album.genre} </p>
                        <p><strong>Songs: </strong> {album.songCount} ({seconds_to_hhmmss(album.duration)}) </p>
                        <p><strong>Year: </strong> {album.year} </p>
                    </Col>
                    <Col sm={24} md={18} style={{paddingLeft:"10px"}}>
                        <h2 id="albumHeader">
                            <img className="rs-hidden-md rs-hidden-lg" src={album.coverArt ? subsonic.getCoverArtUrl(album.coverArt) : null} alt="Album Cover" width="45" height="45" style={{marginRight:"10px", marginBottom:"5px"}} />
                            {album ? album.name : "..."}
                            <IconButton id="starAlbumSM" className="rs-hidden-md rs-hidden-lg" icon={<Icon icon={starIcon} />} appearance="link" size="lg" onClick={starThisAlbum}/>
                        </h2>
                        <SongsTableEnhanced songs={songs} columns={COLUMNS_TO_SHOW} fixedHeightToFill={false} withSearchFilter={false} />
                    </Col>
                </Row>
            </Grid>
        </Panel>
    )
}

Album.propTypes = {
    album : PropTypes.object,
    style : PropTypes.object,
    songs : PropTypes.array,
    starAlbums : PropTypes.func,
    linkArtist : PropTypes.bool,
}

Album.defaultProps = {
    album : {},
    style : {},
    songs : [],
    starAlbums: () => null,
    linkArtist: true,
}