import React, {useState} from "react"
// Utils
import { seconds_to_mss, display_starred } from "../../utils/formatting.js"
import { sortSongsByKey, filterSongsByValue } from "../../utils/utils.js"
import PropTypes from 'prop-types'
// UI
import AutoSizer from 'react-virtualized-auto-sizer'
import InfiniteScroll from 'react-infinite-scroller'
// import "./SongsList.less"
// Table components

function getElementOfSong(song) {
    return <div key={song.id}>{song.title}</div>
}

function SongItem(props) {
    const {song, ...rest} = props
    return (
        <div {...rest} style={{padding:"10px 10px 10px 10px"}}>
            <p><b>{song.title}</b></p>
            <p>{song.artist} in "{song.album}"</p>
        </div>
    )
}

export default function SongsList(props) {
    const {songs, style, ...rest} = props
    // Songs in view
    const [songsDisplayed, setSongsDisplayed] = useState([])

    // Function to call when more songs are asked
    function displayMoreSongs(page, pageSize=20) {
        console.log("loading")
        // Get next songs
        const newSongs = songs.slice(page*pageSize, (page+1)*pageSize)
        setSongsDisplayed([...songsDisplayed, ...newSongs.map(s => <SongItem key={s.id} song={s}/>)])
    }

    return (
        <div style={{...style, display:"flex", flexFlow:"column", overflow:"auto"}}>
            <InfiniteScroll
                pageStart={-1}
                loadMore={displayMoreSongs}
                hasMore={songsDisplayed.length < songs.length}
                loader={<div key="loading">Loading...</div>}
                useWindow={false}>
                {songsDisplayed}
            </InfiniteScroll>
        </div>
    )


}

// Properties
SongsList.propTypes = {

}

// Defaults
SongsList.defaultProps = {
    songs :[],
    style : {},
}
