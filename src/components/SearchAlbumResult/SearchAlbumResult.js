import React from 'react'
import { navigate } from "@reach/router"
import PropTypes from 'prop-types'

import { Icon, Badge } from 'rsuite'
import subsonic from "../../api/subsonicApi"

import "./SearchAlbumResult.less"

export default function SearchAlbumResult(props) {
    const {album, showYear} = props
    return (
        <div className="link_to_album" style={{display:"flex", flexDirection:"column", alignItems:"center", textAlign:"center"}} onClick={ (e) => {navigate("/album/"+album.id)} }>
            <Badge content={album.starred ? <Icon icon='star' /> : false}>
                <div style={{ width: 150, height: 150, display: 'inline-block'}}>
                    <img alt="" src={album.coverArt ? subsonic.getCoverArtUrl(album.coverArt) : "album_placeholder.jpg"} width="150" />
                </div>
            </Badge>
            <p data-key="description">
                <strong>{album.name}</strong><br/>
                {album.artist}
                { showYear && ` (${album.year})` }
            </p>
        </div>
    )
}

SearchAlbumResult.propTypes = {
    album : PropTypes.object.isRequired,
    showYear: PropTypes.bool
}

SearchAlbumResult.defaultProps = {
    showYear: false
}