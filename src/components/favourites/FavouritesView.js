import React from "react"
// Redux
import { connect } from "react-redux"
import { loadFavouriteSongs, setStarOnSongs } from "../../redux/actions/favouritesActions"
import { favouriteSongsSelector } from '../../redux/selectors/songSelectors'
// Utils
import { seconds_to_hhmmss } from "../../utils/formatting.js"
// UI
import SongsTableEnhanced from '../songs/SongsTableEnhanced'
import { Button } from 'rsuite'
import SongsTable from '../songs/SongsTable'

const COLUMNS_TO_SHOW = [SongsTable.columns.selectable, SongsTable.columns.title, SongsTable.columns.artist, SongsTable.columns.album, SongsTable.columns.duration, SongsTable.columns.bitRate, SongsTable.columns.download, SongsTable.columns.starred]

class FavouritesView extends React.Component {

    constructor(props) {
        super(props)
        this.state = { selectedSongs : [], duration : 0 }
    }

    componentDidMount() {
        this.props.loadFavouriteSongs()
    }

    componentDidUpdate(prevProps) {
        if( prevProps.songs.length !== this.props.songs.length ) {
            this.setState({duration : this.props.songs.reduce( (a,b) => ({duration: a.duration+b.duration}), {duration:0} ).duration})
        }
    }

    /* Listeners */

    onSongsSelected = (selectedSongs) => {
        this.setState({selectedSongs: selectedSongs})
    }

    removeSelectedSongs = () => {
        if( this.state.selectedSongs.length > 0 ) {
            this.props.setStarOnSongs(this.state.selectedSongs, false)
        }
    }

    render() {
        const songs = this.props.songs
        const duration = this.state.duration
        const disableButton = this.state.selectedSongs && this.state.selectedSongs.length === 0
        return (
            <div style={{display:"flex", flexFlow:"column", padding:"20px", height:"100%", width:"100%" }}>
                <div style={{ display:"flex", flexFlow: "row", marginBottom:"15px"}}>
                    <div style={{flexGrow:1}}>
                        <h1 style={{color:"white", fontWeight: "bold"}}>Favourites</h1>
                        <span>{ songs.length } songs, {seconds_to_hhmmss(duration)}</span>
                    </div>
                    <div style={{ display:"flex", flexFlow: "column"}}>
                        <Button onClick={this.removeSelectedSongs} disabled={disableButton}>Remove from favourites</Button>
                    </div>
                </div>
                <SongsTableEnhanced style={{flexGrow:1}} songs={songs} onSongsSelected={this.onSongsSelected} columns={COLUMNS_TO_SHOW} fixedHeightToFill={true} withPlaylistDropdown={false} sortable={true} />
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        "songs" : favouriteSongsSelector(state)
    }
}

const mapDispatchToProps = { loadFavouriteSongs, setStarOnSongs }


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FavouritesView)