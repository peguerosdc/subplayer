import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types'
// UI
import { Dropdown, Icon } from 'rsuite';

class PlaylistSelectorDropdown extends React.Component {

    constructor(props) {
        super(props)
        // Create a random key for favourites to avoid constraining the names of the playlists
        // i.e. if we assign eventKey="favs", then a playlist could not have to name "favs"
        this.favourites_key = `${Date.now()}`
    }

    onItemSelected = (eventKey) => {
        if( eventKey === this.favourites_key ) {
            this.props.onFavouritesSelected && this.props.onFavouritesSelected()
        }
        else {
            this.props.onPlaylistSelected && this.props.onPlaylistSelected(this.props.playlists[eventKey])
        }
    }

    render() {
        const showFavourites = this.props.showFavourites
        return (
            <Dropdown title="Add to ..." trigger="click" onSelect={this.onItemSelected} disabled={this.props.disabled} >
                {
                    showFavourites ? 
                        <Dropdown.Item eventKey={this.favourites_key} icon={<Icon icon="star" />}>Favourites</Dropdown.Item>
                        : null
                }
                {
                    showFavourites ? <Dropdown.Item divider /> : null
                }
                {
                    Object.keys(this.props.playlists).map(pId => 
                        this.props.playlists[pId].isMine ?
                            <Dropdown.Item key={pId} eventKey={pId}>{this.props.playlists[pId].name}</Dropdown.Item>
                            : null
                    )
                }
            </Dropdown>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        "playlists" : state.playlists.byId,
    }
}

PlaylistSelectorDropdown.propTypes = {
    onFavouritesSelected : PropTypes.func,
    onPlaylistSelected : PropTypes.func,
    showFavourites : PropTypes.bool
}

PlaylistSelectorDropdown.defaultProps = {
    showFavourites : true
}

export default connect(
    mapStateToProps,
    null
)(PlaylistSelectorDropdown)