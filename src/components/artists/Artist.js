import React from "react"
import PropTypes from 'prop-types'
// Redux
import { connect } from "react-redux"
import { loadOneArtist } from "../../redux/actions/artistsActions"
// UI
import { Nav, Icon } from 'rsuite'
import ArtistAllSongs from './ArtistAllSongs/ArtistAllSongs.js'
import ArtistByAlbums from './ArtistByAlbums/ArtistByAlbums'

export class Artist extends React.Component {

    constructor(props) {
        super(props)
        this.state = {selectedView : Artist.KEY_ALL_SONGS}
    }

    componentDidMount() {
        this.props.loadOneArtist(this.props.artistId)
    }

    onViewSelected = (viewId) => {
        this.setState({selectedView : viewId})
    }

    render() {
        const artist = this.props.artist || {}
        const activeView = this.state.selectedView
        return (
            <div style={{display:"flex", flexFlow:"column", padding:"20px", height:"100%", width:"100%"}}>
                <div style={{display:"flex", flexFlow:"row"}}>
                    <h1 style={{color:"white", fontWeight: "bold", flexGrow:1}}>{artist != null ? artist.name : "..."}</h1>
                    <Nav id="viewSelector" onSelect={this.onViewSelected} activeKey={activeView}>
                        <Nav.Item icon={<Icon icon="bars" />} eventKey={Artist.KEY_ALL_SONGS} />
                        <Nav.Item icon={<Icon icon="th-large" />} eventKey={Artist.KEY_BY_ALBUM} />
                    </Nav>
                </div>
                { activeView === Artist.KEY_BY_ALBUM &&  <ArtistByAlbums artistId={this.props.artistId} />}
                { activeView === Artist.KEY_ALL_SONGS && <ArtistAllSongs artistId={this.props.artistId} style={{flexGrow:1}} /> }
            </div>
        )
    }
}

Artist.propTypes = {
    artistId : PropTypes.string.isRequired,
    artist : PropTypes.object,
    loadOneArtist : PropTypes.func.isRequired
}

Artist.defaultProps = {
    artist : {},
}

Artist.KEY_ALL_SONGS = "all"
Artist.KEY_BY_ALBUM  = "by_album"

const mapStateToProps = (state, props) => {
    return {
        artist : state.artists.byId[props.artistId],
    }
}

const mapDispatchToProps = { loadOneArtist }

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Artist)