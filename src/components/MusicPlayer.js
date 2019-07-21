import React from 'react';
import { connect } from "react-redux";
import { Howl } from 'howler';
import { FlexboxGrid, IconButton, Icon, Slider } from 'rsuite';
import { playNextSong, playPreviousSong } from "../redux/actions/songsActions";
import subsonic from "../api/subsonicApi";

class MusicPlayer extends React.Component {

    constructor(props) {
        super(props)
        this.state = { playing:false, tick: 0}
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
            <FlexboxGrid align="middle">
                {/* Current song playing */}
                <FlexboxGrid.Item colspan={5}>
                    <img src={subsonic.getCoverArtUrl(song.coverArt)} alt="Cover Art" width="42" height="42"/>
                    <b>{song.title}</b> , {song.artist}
                </FlexboxGrid.Item>
                <FlexboxGrid.Item colspan={2}>
                    <IconButton icon={<Icon icon="step-backward" />} appearance="link" size="sm" onClick={this.props.playPreviousSong}/>
                    <IconButton icon={<Icon icon={playing ? "pause" : "play"} />} circle size="sm" onClick={this.togglePlayerState} />
                    <IconButton icon={<Icon icon="step-forward" />} appearance="link" size="sm" onClick={this.props.playNextSong} />
                </FlexboxGrid.Item>
                <FlexboxGrid.Item colspan={11}>
                    {seek} <Slider progress defaultValue={seek} max={song.duration} /> {song.duration}
                </FlexboxGrid.Item>
                <FlexboxGrid.Item colspan={6}>More controls</FlexboxGrid.Item>
            </FlexboxGrid>
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