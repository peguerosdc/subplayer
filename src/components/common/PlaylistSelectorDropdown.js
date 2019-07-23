import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types'
// UI
import { Dropdown } from 'rsuite';

class PlaylistSelectorDropdown extends React.Component {

    onItemSelected = (eventKey) => {
        this.props.onPlaylistSelected && this.props.onPlaylistSelected(this.props.playlists[eventKey])
    }

    render() {
        return (
            <Dropdown title="Add to playlist" trigger="click" onSelect={this.onItemSelected} disabled={this.props.disabled} >
                {
                    Object.keys(this.props.playlists).map(pId => 
                        <Dropdown.Item key={pId} eventKey={pId}>{this.props.playlists[pId].name}</Dropdown.Item>
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
    onPlaylistSelected : PropTypes.func
}

export default connect(
    mapStateToProps,
    null
)(PlaylistSelectorDropdown)