import React from 'react'
import PropTypes from 'prop-types'
// Redux
import { connect } from "react-redux"
import { navigate } from "@reach/router"
import { playNextSong, playPreviousSong } from "../../redux/actions/songsActions"
import { setStarOnSongs } from "../../redux/actions/favouritesActions"
import { getSongCurrentlyPlayingSelector } from '../../redux/selectors/musicPlayerSelector'
// Utils
import { Howl } from 'howler'
import subsonic from "../../api/subsonicApi"
import { seconds_to_mss } from "../../utils/formatting.js"
// UI
import { IconButton, Icon, Slider } from 'rsuite'
import "./MusicPlayer.less"

export class MusicPlayer extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = { playing:false, tick: 0 }
        this.volume = 1.0
    }

    componentDidUpdate(prevProps) {
        // Check if there is a song to play
        if( this.props.song ) {
            var playNextSong = this.props.playNextSong
            var previousSong = prevProps.song ? prevProps.song : {}
            if( this.props.song.id !== previousSong.id) {
                // Stop the current song if playing
                this.clearMusicPlayer()
                // Stop the previous song to prevent both songs to play at the same time
                this.streamer = new Howl({
                    src: [subsonic.getStreamUrl(this.props.song.id)],
                    ext: ['mp3'],
                    preload: false,
                    pool: 2,
                    autoplay: true,
                    html5: true,
                    volume: this.volume,
                    // Play next song
                    onend: function() {
                        playNextSong()
                    }
                })
                this.streamer.play()
                this.startSongTicker()
                this.setState({playing : true, tick: 0})
            }
        }
        // If there is no song to play, stop whatever was playing
        else {
            this.clearMusicPlayer()
        }
    }

    startSongTicker() {
        clearInterval(this.timerID)
        this.timerID = setInterval(() => {
            if( this.state.playing ) {
                this.tick()
            }
        }, 1000)
    }

    tick() {
        this.setState({
            tick: Math.ceil(this.streamer.seek())
        })
    }

    componentWillUnmount() {
        clearInterval(this.timerID)
        // Stop the current song if playing
        this.clearMusicPlayer()
    }

    changeVolume = (newVolume) => {
        this.streamer && this.streamer.volume(newVolume)
        this.volume = newVolume
    }

    togglePlayerState = () => {
        if( this.streamer ) {
            if(this.state.playing) {
                this.streamer.pause()
            }
            else {
                this.streamer.play()
            }
            this.setState({ playing : !this.state.playing })
        }
    }

    toggleStarOnSong = () => {
        if( this.props.song && this.props.setStarOnSongs ){
            this.props.setStarOnSongs([this.props.song], !this.props.song.starred)
        }
    }

    goToQueueView = () => {
        navigate("/queue/")
    }

    playNextSong = () => {
        this.props.playNextSong && this.props.playNextSong()
    }

    playPreviousSong = () => {
        this.props.playPreviousSong && this.props.playPreviousSong()
    }

    clearMusicPlayer = () => {
        if( this.streamer ) {
            this.streamer.stop()
            this.streamer.unload()
        }
        clearInterval(this.timerID)
        // "Reset" UI
        this.state.playing && this.setState({playing : false, tick: 0})
    }

    render () {
        const song = this.props.song ? this.props.song : {}
        const playing = this.state.playing
        const seek = this.state.tick
        const starIcon = song.starred ? "star" : "star-o"
        return (
            <div className="darkMusicPlayer">
                {/* Currently playing information */}
                <div className="song_metadata_container">
                    <img src={song.coverArt ? subsonic.getCoverArtUrl(song.coverArt) : "/currently_placeholder.png"} alt="cover" width="45" height="45"/>
                    <div style={{overflow:"hidden"}}>
                        <p id="song_name"><b>{song.title}</b></p>
                        <span id="song_artist">{song.artist}</span>
                    </div>
                    <IconButton id="star_button" icon={<Icon icon={starIcon} />} onClick={this.toggleStarOnSong} appearance="link" size="lg"/>
                </div>
                {/* Music player controls */}
                <div className="currently_playing_controls">
                    <IconButton id="previous_button" icon={<Icon icon="step-backward" />} appearance="link" size="sm" onClick={this.playPreviousSong}/>
                    <IconButton id="play_pause_button" appearance="primary" icon={<Icon icon={playing ? "pause" : "play"} />} circle size="sm" onClick={this.togglePlayerState} />
                    <IconButton id="next_button" icon={<Icon icon="step-forward" />} appearance="link" size="sm" onClick={this.playNextSong} />
                </div>
                {/* Song seeking controls */}
                <div style={{flexGrow:1}} className="rs-hidden-xs">
                    <div className="song_progress_bar_container">
                        <span>{seconds_to_mss(seek)}</span>
                        <Slider tooltip={false} className="song_progress_bar" progress value={seek} max={song.duration || 0} />
                        <span>{seconds_to_mss(song.duration || 0)}</span>
                    </div>
                </div>
                {/* Go to queue */}
                <div className="go_to_queue_container">
                    <IconButton id="queue_button" icon={<Icon icon="bars" />} onClick={this.goToQueueView} appearance="link" size="lg"/>
                </div>
                {/* Volume controls */}
                <div className="rs-hidden-xs">
                    <div className="volume_controls_container">
                        <Icon className="volume_control_mute" icon='volume-up' />
                        <Slider tooltip={false} progress className="volume_control_bar" onChange={this.changeVolume} defaultValue={1} max={1} step={0.1} />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        "song" : getSongCurrentlyPlayingSelector(state)
    }
}

const mapDispatchToProps = { playNextSong, playPreviousSong, setStarOnSongs }

MusicPlayer.propTypes = {
    playNextSong : PropTypes.func,
    playPreviousSong : PropTypes.func,
    setStarOnSongs : PropTypes.func,
    song : PropTypes.object
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MusicPlayer)