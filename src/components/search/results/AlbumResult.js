import PropTypes from 'prop-types'
import subsonic from "../../../api/subsonicApi"

export function AlbumResult(props) {
    const album = props.album
    return (
        <div style={{display:"flex", flexDirection:"column", alignItems:"center", textAlign:"center"}}>
            <div
                style={{
                    width: 100,
                    height: 100,
                    background: '#f5f5f5',
                    borderRadius: "50%",
                    overflow: 'hidden',
                    display: 'inline-block'
                }}>
                <img alt="" src={album.coverArt ? subsonic.getCoverArtUrl(album.coverArt) : "album_placeholder.jpg"} width="100" />
            </div>
            {`"${album.name}" by "${album.artist}"`}
        </div>
    )
}

AlbumResult.propTypes = {
    album : PropTypes.object.isRequired
}