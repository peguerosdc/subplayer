import React from "react"
// Redux
import { connect } from "react-redux"
import { navigate } from "@reach/router"
import { getSongCurrentlyPlayingSelector } from '../../redux/selectors/musicPlayerSelector'
// UI
import "./ArtistsList.less"
import { Icon, Col } from 'rsuite'

class ArtistIndex extends React.Component {

    constructor(props) {
        super(props)
        this.ids = new Set(props.index.artist.map(a => a.id))
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
        const index = this.props.index
        const currentArtistPlayingId = this.props.currentSongPlaying && this.props.currentSongPlaying.artistId
        return (
            <div>
                <h2 className="link_to_artist_header">{index.name}</h2>
                <div style={{display:"flex", flexDirection:"row", flexWrap:"wrap"}}>
                    {index.artist.map(artist => (
                        <Col key={artist.id} sm={8} xs={12} className={currentArtistPlayingId === artist.id ? "link_to_artist playing" : "link_to_artist"} onClick={ (e) => {navigate("/artists/"+artist.id)} }>
                            {artist.name} <Icon icon='volume-up' />
                        </Col>
                    ))}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        currentSongPlaying : getSongCurrentlyPlayingSelector(state),
        index: state.artists.byIndex[ownProps.index]
    }
}

export default connect(
    mapStateToProps,
    null
)(ArtistIndex)