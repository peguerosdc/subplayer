import React from "react"
import PropTypes from 'prop-types'
// UI
import { Col } from 'rsuite'

function ArtistHeader(props) {
    const { name } = props
    return (
    	<Col sm={24} xs={24} >
	        <h4 id="title" className="artist-header">{name}</h4>
        </Col>
    )
}

ArtistHeader.propTypes = {
    name : PropTypes.string
}

export default ArtistHeader