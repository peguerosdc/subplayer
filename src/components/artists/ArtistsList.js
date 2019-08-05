import React from "react"
// Redux
import { loadArtists } from "../../redux/actions/artistsActions"
import { connect } from "react-redux"
// UI
import "./ArtistsList.less"
import ArtistIndex from "./ArtistIndex.js"
import InfiniteScroll from 'react-infinite-scroller'

class ArtistsList extends React.Component {

    constructor(props) {
        super(props)
        const hasArtistsToRender = this.props.artists !== null && this.props.artists.length > 0
        this.state = {artistsToDisplay : [], hasMoreToLoad : hasArtistsToRender }
    }
    
    componentDidMount() {
        if( this.props.artists.length === 0 ) {
            this.props.loadArtists()
        }
    }

    componentDidUpdate(prevProps) {
        if( prevProps.artists.length === 0 && this.props.artists.length > 0 ) {
            this.setState({hasMoreToLoad : true})
        }
    }

    cacheArtistsIndex = (page) => {
        // Define each page with 3 elements
        const pageSize = 3
        if( page*pageSize + pageSize < this.props.artists.length + pageSize) {
            let hasMoreToLoad = true
            // Cap maximum value
            let maximumValue = page*pageSize + pageSize
            if( page*pageSize + pageSize > this.props.artists.length) {
                maximumValue = this.props.artists.length
                hasMoreToLoad = false
            }
            // Add new artists
            let toAdd = []
            for (var i = page*pageSize; i < maximumValue; i++) {
                toAdd.push( <ArtistIndex key={i} index={i} /> )
            }
            this.setState({
                artistsToDisplay : this.state.artistsToDisplay.concat(toAdd),
                hasMoreToLoad : hasMoreToLoad})
        }
        else {
            this.setState({hasMoreToLoad : false})
        }
    }

    render() {
        return (
            <div style={{padding:"20px", display:"flex", flexDirection:"column", height:"100%", overflow:"auto"}}>
                <h1 className="artists_list_title">All artists</h1>
                <InfiniteScroll
                    pageStart={-1}
                    loadMore={this.cacheArtistsIndex}
                    hasMore={this.state.hasMoreToLoad}
                    loader={<div key={0}>Loading ...</div>}
                    useWindow={false}>
                    {this.state.artistsToDisplay}
                </InfiniteScroll>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        artists: state.artists.byIndex,
    }
}

const mapDispatchToProps = { loadArtists }


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ArtistsList)