import React from "react"
import PropTypes from 'prop-types'
// UI
import "./ArtistHeader.less"
import { Col } from 'rsuite'

function ArtistHeader(props) {
    const { name } = props
    return (
    	<Col key={name} sm={24} xs={24} >
	        <h2 id="title" className="link_to_artist_header">{name}</h2>
        </Col>
    )
}

ArtistHeader.propTypes = {
    name : PropTypes.string
}

export default ArtistHeader