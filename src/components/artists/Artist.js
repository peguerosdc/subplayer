import React from "react";
import { connect } from "react-redux";
import subsonic from "../../api/subsonicApi";
import Album from '../albums/Album'
import { beginAsyncTask, asyncTaskSuccess, asyncTaskError } from "../../redux/actions/apiStatusActions"
import { clearAlbums } from "../../redux/actions/albumActions"
import InfiniteScroll from 'react-infinite-scroller'

class Artist extends React.Component {

    constructor(props) {
        super(props)
        this.state = { artist : {}, albumsToDisplay : [], hasMoreToLoad: false}
    }

    async componentDidMount() {
        this.props.clearAlbums()
        await this.loadArtist(this.props.artistId)
    }

    loadArtist = async (id) => {
        this.props.beginAsyncTask()
        try {
            const artist = await subsonic.getArtist(id)
            this.setState({artist : artist, hasMoreToLoad : true})
            this.props.asyncTaskSuccess()
        }
        catch(error) {
            console.error(error)
            this.props.asyncTaskError(error.message)
        }
    }

    cacheArtistsIndex = (page) => {
        const artist = this.state.artist
        const albums = artist && artist.album ? artist.album : []
        // Define each page with 3 elements
        const pageSize = 3
        if( page*pageSize + pageSize < albums.length + pageSize) {
            let hasMoreToLoad = true
            // Cap maximum value
            let maximumValue = page*pageSize + pageSize
            if( page*pageSize + pageSize > albums.length) {
                maximumValue = albums.length
                hasMoreToLoad = false
            }
            // Add new albums
            let toAdd = []
            for (var i = page*pageSize; i < maximumValue; i++) {
                const album = albums[i]
                toAdd.push( <Album key={i} albumId={album.id} style={{marginTop:"10px", marginBottom:"10px", minHeight:"300px"}}/> )
            }
            this.setState({
                albumsToDisplay : this.state.albumsToDisplay.concat(toAdd),
                hasMoreToLoad : hasMoreToLoad})
        }
        else {
            this.setState({hasMoreToLoad : false})
        }
    }

    render() {
        const artist = this.state.artist
        return (
            <div style={{padding:"20px", height:"100%", overflow:"auto"}}>
                <h1 style={{color:"white", fontWeight: "bold"}}>{artist != null ? artist.name : "..."}</h1>
                <InfiniteScroll
                    pageStart={-1}
                    loadMore={this.cacheArtistsIndex}
                    hasMore={this.state.hasMoreToLoad}
                    loader={<div key={0}>Loading ...</div>}
                    useWindow={false}>
                    {this.state.albumsToDisplay}
                </InfiniteScroll>
            </div>
        )
    }
}

const mapDispatchToProps = { beginAsyncTask, asyncTaskSuccess, asyncTaskError, clearAlbums }

export default connect(
    null,
    mapDispatchToProps
)(Artist)