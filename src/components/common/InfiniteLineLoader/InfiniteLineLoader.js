import React from "react"
import PropTypes from 'prop-types'
import "./InfiniteLineLoader.less"

class InfiniteLineLoader extends React.PureComponent {

    render() {
        const display = this.props.isLoading ? "initial" : "none"
        return (
            <div className="loader" style={{display: display, position: "absolute"}}/>
        )
    }

}

InfiniteLineLoader.propTypes = {
    isLoading : PropTypes.bool
}

InfiniteLineLoader.defaultProps = {
    isLoading : false
}

export default InfiniteLineLoader