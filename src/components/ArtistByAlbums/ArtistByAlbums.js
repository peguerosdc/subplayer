import React from "react"
import PropTypes from 'prop-types'
// Utils
import subsonic from "../../api/subsonicApi"
// UI
import Album from "../Album"
import { Divider, Nav, SelectPicker } from 'rsuite'
import "./ArtistByAlbums.less"

export default class ArtistByAlbums extends React.Component {

    constructor(props) {
        super(props)
        this.state = {selectedAlbumId : null}
    }

    onAlbumSelected = (albumId) => {
        this.setState({selectedAlbumId : albumId})
    }

    render() {
        const albums = this.props.albums
        const selectedAlbumId = this.state.selectedAlbumId
        const selectableAlbums = albums.map(album => ({ value : album.id, label : album.name }))
        return (
            <div style={{display:"flex", flexFlow:"column", height:"100%", padding:"15px 5px 0px 5px"}}>
                {/* Provide with a Select on small screens to navigate through the albums */}
                <div style={{marginBottom:"10px"}} className="rs-hidden-lg rs-hidden-md">
                    <SelectPicker id="selectAlbums" data={selectableAlbums} style={{ width: 224 }} searchable={false} cleanable={false} onChange={this.onAlbumSelected}/>
                </div>
                <div style={{display:"flex", flexFlow:"row", height:"100%"}}>
                    {/* Provide with a nice albums collection on normal screens to navigate through the albums */}
                    <Nav className="nav-artist-by-albums rs-hidden-xs rs-hidden-sm" vertical onSelect={this.onAlbumSelected} activeKey={selectedAlbumId}>
                        {albums.map(album =>
                            <Nav.Item key={album.id} eventKey={album.id} >
                                <img src={album.coverArt ? subsonic.getCoverArtUrl(album.coverArt) : "/currently_placeholder.png"} alt="cover" width="40" height="40"/>
                                <span>{" "}{album.name}</span>
                            </Nav.Item>
                        )}
                    </Nav>
                    <Divider className="rs-hidden-xs rs-hidden-sm" vertical style={{height:"100%", minWidth:"1px"}} />
                    {/* This is the main album card */}
                    <div style={{flexGrow:1, paddingBottom:"10px"}} >
                        {selectedAlbumId && <Album id="album" albumId={selectedAlbumId} style={{height:"100%", overflow:"auto"}} />}
                    </div>
                </div>
            </div>
        )
    }
}

ArtistByAlbums.propTypes = {
    albums : PropTypes.array,
}

ArtistByAlbums.defaultProps = {
    albums : [],
}
