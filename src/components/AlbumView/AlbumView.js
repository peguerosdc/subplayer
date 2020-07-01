import React from "react"
import PropTypes from 'prop-types'
// UI
import Album from '../Album'

export default class AlbumView extends React.PureComponent {

    componentDidMount() {
        this.props.loadAlbum(this.props.albumId)
    }

    render() {
        const albumId = this.props.albumId
        return (
            <div style={{padding:"20px"}}>
                <Album albumId={albumId} />
            </div>
        )
    }
}

AlbumView.propTypes = {
    loadAlbum : PropTypes.func.isRequired,
    albumId : PropTypes.string.isRequired,
}

AlbumView.defaultProps = {
    loadAlbum : () => {},
    albumId : null,
}