import React, {useState, useEffect} from "react"
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
    // Pagination state
    const [currentPage, setCurrentPage] = useState({page:0, songsDisplayed:[]})

    // Function to call when a new page is asked to be rendered
    function updatePage() {
        // update the page
        const newPage = currentPage.page + 1
        // get the songs that will go in this new page
        const newSongs = getSongsOfPage(newPage)
        // update the state appending the new songs
        const songsInPage = [...currentPage.songsDisplayed, ...newSongs]
        setCurrentPage({page:newPage, songsDisplayed: songsInPage})
    }

    // Function to call when more songs are asked
    function getSongsOfPage(page, pageSize=20) {
        console.log("getting songs of page "+page)
        // Get next songs. Page is 1-based. If zero based, do page+1
        const newSongs = songs.slice((page-1)*pageSize, (page)*pageSize)
        return newSongs.map(s => <SongItem key={s.id} song={s}/>)
    }

    useEffect(() => {
        //reset the page and the songs to display
        setCurrentPage({page:1, songsDisplayed: getSongsOfPage(1)})
    }, [songs])

    return (
        <div style={{...style, display:"flex", flexFlow:"column", overflow:"auto"}}>
            <InfiniteScroll
                pageStart={-1}
                initialLoad={false}
                loadMore={updatePage}
                hasMore={currentPage.songsDisplayed.length < songs.length}
                loader={<div key="loading">Loading...</div>}
                useWindow={false}>
                {currentPage.songsDisplayed}
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
