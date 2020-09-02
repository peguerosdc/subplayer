import React from "react"
import PropTypes from 'prop-types'
// UI
import { Input, InputGroup, Icon } from 'rsuite'

export default class SearchBar extends React.PureComponent {

    performSearch = () => {
        this.props.onSearch && this.props.onSearch(this.query)
    }

    handleKeyDown = (e) => {
        if( e.key === "Enter" ) {
            this.performSearch()
        }
    }

    render() {
        return (
            <InputGroup inside size={this.props.size} style={this.props.style}>
                <Input id="queryBar" placeholder="Search" onChange={(value => {this.query = value})} onKeyDown={this.handleKeyDown} />
                <InputGroup.Button id="searchButton" onClick={this.performSearch}><Icon icon="search" /></InputGroup.Button>
            </InputGroup>
        )
    }
}

SearchBar.propTypes = {
    size : PropTypes.string,
    onSearch : PropTypes.func.isRequired
}

SearchBar.defaultProps = {
    size : "lg",
}
