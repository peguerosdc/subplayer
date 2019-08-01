import React from "react"
import { connect } from "react-redux"
import subsonic from "../../api/subsonicApi"
import { beginAsyncTask, asyncTaskSuccess, asyncTaskError } from "../../redux/actions/apiStatusActions"
import { seconds_to_hhmmss } from "../../utils/formatting.js"
// UI
import { Button } from 'rsuite';
import SongsTable from '../songs/SongsTable'


class FavouritesView extends React.Component {

    constructor(props) {
        super(props)
        this.state = { songs : [], selectedSongs : [], waitingForDeletion: false}
    }

    async componentDidMount() {
        await this.loadStarred()
    }

    /* Listeners */

    onSongsSelected = (selectedSongs) => {
        this.setState({selectedSongs: selectedSongs})
    }

    removeSelectedSongs = async () => {
        if( this.state.selectedSongs.length > 0 ) {
            const idsToRemove = this.state.selectedSongs.map(song => song.id)
            await this.unstar(idsToRemove)
        }
    }

    /* Starring methods  */
    loadStarred = async () => {
        this.props.beginAsyncTask()
        try {
            const favourites = await subsonic.getStarred()
            const favSongs = favourites["song"] || []
            // Set to state
            console.log(favSongs)
            const duration = favSongs.reduce( (a,b) => ({duration: a.duration+b.duration}), {duration:0} ).duration
            this.setState({songs : favSongs, duration: duration})
            this.props.asyncTaskSuccess()
        }
        catch(error) {
            console.error(error)
            this.props.asyncTaskError(error.message)
        }
    }

    unstar = async (songIds) => {
        this.props.beginAsyncTask()
        try {
            const result = await subsonic.unstar(songIds)
            // Set to state without the old stared songs
            if( result ) {
                const newFavSongs = this.state.songs.filter( song => !songIds.includes(song.id) )
                const duration = newFavSongs.reduce( (a,b) => ({duration: a.duration+b.duration}), 0 ).duration
                this.setState({songs : newFavSongs, duration: duration})
                this.props.asyncTaskSuccess()
            }
            else {
                this.props.asyncTaskError("Unable to remove from favourites")
            }
        }
        catch(error) {
            console.error(error)
            this.props.asyncTaskError(error.message)
        }
    }

    render() {
        const songs = this.state.songs
        const duration = this.state.duration
        const disableButton = this.state.selectedSongs && this.state.selectedSongs.length === 0
        return (
            <div style={{padding:"20px", height:"100%", overflow:"auto"}}>
                <div style={{ display:"flex", flexFlow: "row", marginBottom:"15px"}}>
                    <div style={{flexGrow:1}}>
                        <h1 style={{color:"white", fontWeight: "bold"}}>Favourites</h1>
                        <span>{ songs.length } songs, {seconds_to_hhmmss(duration)}</span>
                    </div>
                    <div style={{ display:"flex", flexFlow: "column"}}>
                        <Button onClick={this.removeSelectedSongs} disabled={disableButton}>Remove from favourites</Button>
                    </div>
                </div>
                <SongsTable songs={songs} onSongsSelected={this.onSongsSelected} />
            </div>
        )
    }
}

const mapDispatchToProps = { beginAsyncTask, asyncTaskSuccess, asyncTaskError }

export default connect(
    null,
    mapDispatchToProps
)(FavouritesView)