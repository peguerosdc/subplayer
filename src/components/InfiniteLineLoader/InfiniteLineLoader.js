import React from 'react'
import PropTypes from 'prop-types'
import "./InfiniteLineLoader.less"

function InfiniteLineLoader(props) {
    const display = props.isLoading ? "initial" : "none"
    return (
        <div className="loader" style={{display: display, position: "absolute"}}/>
    )
}

InfiniteLineLoader.propTypes = {
    isLoading : PropTypes.bool
}

InfiniteLineLoader.defaultProps = {
    isLoading : false
}

export default InfiniteLineLoader