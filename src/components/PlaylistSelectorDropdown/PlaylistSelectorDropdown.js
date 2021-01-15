import React from "react"
import PropTypes from 'prop-types'
// UI
import { Dropdown, Icon } from 'rsuite'

export default class PlaylistSelectorDropdown extends React.Component {

    constructor(props) {
        super(props)
        // Create a random key for favourites to avoid constraining the names of the playlists
        // i.e. if we assign eventKey="favs", then a playlist could not be named "favs"
        this.favourites_key = `${Math.random()}`
        this.queue_key = `${Math.random()}`
    }

    onItemSelected = (eventKey) => {
        if(this.props.playlists[eventKey]) {
            this.props.onPlaylistSelected && this.props.onPlaylistSelected(this.props.playlists[eventKey])
        }
        else if( this.favourites_key === eventKey ) {
            this.props.onFavouritesSelected && this.props.onFavouritesSelected()
        }
        else {
            this.props.onQueueSelected && this.props.onQueueSelected()
        }
    }

    render() {
        const showFavourites = this.props.showFavourites
        const showQueue = this.props.showQueue
        return (
            <Dropdown id="selectDropdown" title="Add to ..." trigger="click" onSelect={this.onItemSelected} disabled={this.props.disabled} placement="bottomEnd" >
                {
                    showFavourites ? 
                        <Dropdown.Item id="favourites_item" eventKey={this.favourites_key} icon={<Icon icon="star" />}>Favourites</Dropdown.Item>
                        : null
                }
                {
                    showQueue ? 
                        <Dropdown.Item id="queue_item" eventKey={this.queue_key} icon={<Icon icon="bars" />}>Queue</Dropdown.Item>
                        : null
                }
                {
                    showFavourites ? <Dropdown.Item divider /> : null
                }
                {
                    Object.keys(this.props.playlists).map(pId => 
                        this.props.playlists[pId].isMine ?
                            <Dropdown.Item key={pId} data-key={pId} eventKey={pId}>{this.props.playlists[pId].name}</Dropdown.Item>
                            : null
                    )
                }
            </Dropdown>
        )
    }

}

PlaylistSelectorDropdown.propTypes = {
    playlists : PropTypes.object.isRequired,
    onFavouritesSelected : PropTypes.func,
    onPlaylistSelected : PropTypes.func,
    showFavourites : PropTypes.bool.isRequired,
    showQueue : PropTypes.bool.isRequired
}

PlaylistSelectorDropdown.defaultProps = {
    playlists : {},
    showFavourites : true,
    showQueue : true,
}
