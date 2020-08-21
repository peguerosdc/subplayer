import React from 'react'
import { navigate } from "@reach/router"
import PropTypes from 'prop-types'

import subsonic from "../../api/subsonicApi"

import "./SearchAlbumResult.less"

export default function SearchAlbumResult(props) {
    const album = props.album
    return (
        <div className="link_to_album" style={{display:"flex", flexDirection:"column", alignItems:"center", textAlign:"center"}} onClick={ (e) => {navigate("/album/"+album.id)} }>
            <div
                style={{
                    width: 150,
                    height: 150,
                    background: '#f5f5f5',
                    display: 'inline-block'
                }}>
                <img alt="" src={album.coverArt ? subsonic.getCoverArtUrl(album.coverArt) : "album_placeholder.jpg"} width="150" />
            </div>
            <p>
                <strong>{album.name}</strong><br/>
                {album.artist}
            </p>
        </div>
    )
}

SearchAlbumResult.propTypes = {
    album : PropTypes.object.isRequired
}