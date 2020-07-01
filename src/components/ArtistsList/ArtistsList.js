import React from "react"
import PropTypes from 'prop-types'
// UI
import ArtistElement from "../ArtistListElement"
import ArtistLoader from "../ArtistListLoader"
import InfiniteScroll from 'react-infinite-scroller'
import ArtistHeader from "../ArtistListHeader"

/* Define each page with (around) pageSize elements.
 * This will be just an estimated value, as the final value (to keep UI consistency)
 * must be calculated as a multiple of 2 (for small screens) and 3 (for bigger screens)
 */
export function getNextArtists(elementsRendered, artists, pageSize=50) {
    // Render the next ~pageSize elements
    let toAdd = []
    let artistsAddedInLastSection = 0
    let keepAdding = true
    do {
        const elementsAdded = toAdd.length
        const indexToAdd = elementsRendered + elementsAdded
        // Add the correct UI type to the list
        const elementToAdd = artists[indexToAdd]
        toAdd.push( elementToAdd.header ? <ArtistHeader key={elementToAdd.header} name={elementToAdd.header} /> : <ArtistElement key={elementToAdd.id} artist={elementToAdd} /> )
        /* Update the amount of artists added under the last header. If the new element is a header, this counter
         * should be restarted */
        artistsAddedInLastSection = elementToAdd.header ? 0 : artistsAddedInLastSection + 1
        /*  We should stop adding artists when:
         *  (there are no more elements to add) OR (the amount of artists added is multiple of 2 and 3 above pageSize) */
        if( indexToAdd === (artists.length-1) ||
            (elementsAdded >= pageSize && artistsAddedInLastSection % 2 === 0 && artistsAddedInLastSection % 3 === 0) ) {
            keepAdding = false
        }
    }
    while(keepAdding)
    return toAdd
}

export class ArtistsList extends React.Component {

    constructor(props) {
        super(props)
        const hasArtistsToRender = this.props.artists !== null && this.props.artists.length > 0
        this.state = {artistsToDisplay : [], hasMoreToLoad : hasArtistsToRender }
        // This will keep a count on how many elements are already rendered
        this._elementsRendered = 0
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

    displayMoreArtists = page => {
        const toAdd = getNextArtists(this._elementsRendered, this.props.artists)
        // Update state
        this._elementsRendered += toAdd.length
        this.setState({
            artistsToDisplay : this.state.artistsToDisplay.concat(toAdd),
            // There will be more elements to load if the list of artists is not over yet
            hasMoreToLoad : this._elementsRendered < this.props.artists.length
        })
    }

    render() {
        return (
            <div style={{padding:"20px", display:"flex", flexDirection:"column", height:"100%", overflow:"auto"}}>
                <h1 style={{marginBottom:"45px" }}>All artists</h1>
                <InfiniteScroll
                    pageStart={0}
                    loadMore={this.displayMoreArtists}
                    hasMore={this.state.hasMoreToLoad}
                    loader={<ArtistLoader key="loader" />}
                    useWindow={false}>
                    {this.state.artistsToDisplay}
                </InfiniteScroll>
            </div>
        )
    }
}

ArtistsList.propTypes = {
    artists : PropTypes.array,
    loadArtists : PropTypes.func.isRequired
}

ArtistsList.defaultProps = {
    artists : [],
    loadArtists : () => (null)
}