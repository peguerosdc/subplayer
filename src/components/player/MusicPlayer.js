import React from 'react';
import { connect } from "react-redux";
import { Howl } from 'howler';
import { playNextSong, playPreviousSong } from "../../redux/actions/songsActions";
import subsonic from "../../api/subsonicApi";
import { seconds_to_mss } from "../../utils/formatting.js"
// UI
import { FlexboxGrid, IconButton, Icon, Slider, Progress } from 'rsuite';
import "./MusicPlayer.less"

class MusicPlayer extends React.Component {

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
                if( this.streamer ) {
                    this.streamer.stop()
                }
                // Stop the previous song to prevent both songs to play at the same time
                this.streamer = new Howl({
                    src: [subsonic.getStreamUrl(this.props.song.id)],
                    ext: ['mp3'],
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
    }

    startSongTicker() {
        this.timerID = setInterval(() => {
            if( this.state.playing ) {
                this.tick()
            }
        }, 1000)
    }

    tick() {
        this.setState({
            tick: this.state.tick + 1
        });
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    changeVolume = (newVolume) => {
        if( this.streamer ) {
            this.streamer.volume(newVolume)
        }
        this.volume = newVolume;
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

    render () {
        const song = this.props.song ? this.props.song : {}
        const playing = this.state.playing
        const seek = this.state.tick
        return (
            <div className="darkMusicPlayer">
                <img src={song.coverArt ? subsonic.getCoverArtUrl(song.coverArt) : null} alt="Cover Art" width="45" height="45"/>
                <div className="song_metadata_container">
                    <p><b>{song.title}</b></p>
                    {song.artist}
                </div>
                <IconButton icon={<Icon icon="step-backward" />} appearance="link" size="sm" onClick={this.props.playPreviousSong} style={{color:"white"}}/>
                <IconButton appearance="primary" icon={<Icon icon={playing ? "pause" : "play"} />} circle size="sm" onClick={this.togglePlayerState} />
                <IconButton icon={<Icon icon="step-forward" />} appearance="link" size="sm" onClick={this.props.playNextSong} style={{color:"white"}} />
                <span>{seconds_to_mss(seek)}</span>
                <Slider className="song_progress_bar" progress value={seek} max={song.duration} />
                <span>{seconds_to_mss(song.duration ? song.duration : 0)}</span>
                <Icon className="volume_control_mute rs-hidden-xs rs-hidden-sm" icon='volume-up' />
                <Slider tooltip={false} progress className="volume_control_bar rs-hidden-xs rs-hidden-sm" onChange={this.changeVolume} defaultValue={1} max={1} step={0.1} />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        "song" : state.songs.current
    }
}

const mapDispatchToProps = { playNextSong, playPreviousSong }

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MusicPlayer)