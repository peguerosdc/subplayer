import React from "react"
import PropTypes from 'prop-types'

function ResponsiveTitle(props) {
    return (
        <>
            <h1 style={props.style} className="rs-hidden-xs rs-hidden-sm">{props.children}</h1>
            <h3 style={props.style} className="rs-hidden-md rs-hidden-lg">{props.children}</h3>
        </>
    )
}

ResponsiveTitle.propTypes = {
    style : PropTypes.object,
    children : PropTypes.any
}

export default ResponsiveTitle

