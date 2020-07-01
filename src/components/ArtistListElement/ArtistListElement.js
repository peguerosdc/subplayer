import React from "react"
import PropTypes from 'prop-types'
import { navigate } from "@reach/router"
// UI
import "./ArtistListElement.less"
import { Icon, Col } from 'rsuite'

export default class ArtistListElement extends React.Component {

    shouldComponentUpdate(nextProps, nextState) {
        let shouldReRender = true
        // Avoid re-rendering if the current artist playing didnt change
        if( nextProps.currentSongPlaying !== null &&
            nextProps.currentSongPlaying.id !== this.props.currentSongPlaying.id ) {
            // Check if this artists needs to be re-rendered
            const nextArtistId = nextProps.currentSongPlaying.artistId
            const currentArtistId = this.props.currentSongPlaying.artistId
            shouldReRender = false
            // Check if this artist used to have it and now it doesnt
            if( this.props.artist.id === currentArtistId && this.props.artist.id !== nextArtistId ) {
                shouldReRender = true
            }
            // Check if this artist used not to be here and now it does
            if( this.props.artist.id !== currentArtistId && this.props.artist.id === nextArtistId ) {
                shouldReRender = true
            }
        }
        return shouldReRender
    }
    
    render() {
        const currentArtistPlayingId = this.props.currentSongPlaying && this.props.currentSongPlaying.artistId
        const artist = this.props.artist
        return (
            <Col id="name" sm={8} xs={12} className={currentArtistPlayingId === artist.id ? "link_to_artist currently-playing" : "link_to_artist"} onClick={ (e) => {navigate("/artists/"+artist.id)} }>
                {artist.name} <Icon icon='volume-up' />
            </Col>
        )
    }
}

ArtistListElement.propTypes = {
    currentSongPlaying : PropTypes.object,
    artist : PropTypes.object,
}

ArtistListElement.defaultProps = {
    currentSongPlaying : {},
    artist : {}
}
