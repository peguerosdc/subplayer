import React from "react"
import PropTypes from 'prop-types'
// Redux
import { connect } from "react-redux"
import { navigate } from "@reach/router"
import { getSongCurrentlyPlayingSelector } from '../../../redux/selectors/musicPlayerSelector'
// UI
import "./ArtistsList.less"
import { Icon, Col } from 'rsuite'

export class ArtistIndex extends React.Component {

    constructor(props) {
        super(props)
        this.ids = new Set(props.indexObject.artist.map(a => a.id))
    }

    shouldComponentUpdate(nextProps, nextState) {
        let shouldReRender = true
        // Avoid re-rendering if the current artist playing didnt change
        if( nextProps.currentSongPlaying !== null &&
            nextProps.currentSongPlaying.id !== this.props.currentSongPlaying.id ) {
            // Check if any artist in this ArtistIndex has to change
            const nextArtistId = nextProps.currentSongPlaying.artistId
            const currentArtistId = this.props.currentSongPlaying.artistId
            shouldReRender = false
            // Check if this artist used to have it and now it doesnt
            if( this.ids.has(currentArtistId) && !this.ids.has(nextArtistId) ) {
                shouldReRender = true
            }
            // Check if this artist used not to be here and now it does
            if( !this.ids.has(currentArtistId) && this.ids.has(nextArtistId) ) {
                shouldReRender = true
            }
        }
        return shouldReRender
    }
    
    render() {
        const index = this.props.indexObject
        const currentArtistPlayingId = this.props.currentSongPlaying && this.props.currentSongPlaying.artistId
        const artists = index.artist
        return (
            <div>
                <h2 className="link_to_artist_header">{index.name}</h2>
                <div style={{display:"flex", flexDirection:"row", flexWrap:"wrap"}}>
                    {artists.map(artist => (
                        <Col key={artist.id} sm={8} xs={12} className={currentArtistPlayingId === artist.id ? "link_to_artist playing" : "link_to_artist"} onClick={ (e) => {navigate("/artists/"+artist.id)} }>
                            {artist.name} <Icon icon='volume-up' />
                        </Col>
                    ))}
                </div>
            </div>
        )
    }
}

ArtistIndex.propTypes = {
    currentSongPlaying : PropTypes.object,
    index : PropTypes.number.isRequired,
    indexObject : PropTypes.object,
}

ArtistIndex.defaultProps = {
    currentSongPlaying : {},
    index : 0,
    indexObject : { artist : [] }
}

const mapStateToProps = (state, ownProps) => {
    return {
        currentSongPlaying : getSongCurrentlyPlayingSelector(state),
        indexObject: state.artists.byIndex[ownProps.index]
    }
}

export default connect(
    mapStateToProps,
    null
)(ArtistIndex)