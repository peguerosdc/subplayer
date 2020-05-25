import React from "react"
import PropTypes from 'prop-types'
import { navigate } from "@reach/router"
// Redux
import { connect } from "react-redux"
import { search } from "../../redux/actions/searchActions"
// UI
import { Input, InputGroup, Icon } from 'rsuite'

/* Create a presentational SearchBar */

export class SearchBar extends React.PureComponent {

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
            <InputGroup inside size={this.props.size} style={{...this.props.style}}>
                <Input id="query" placeholder="Search" onChange={(value => {this.query = value})} onKeyDown={this.handleKeyDown} />
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

/* Create a SearchBar connected to the store to automatically perform searches in the App */

class HOCSearchBar extends React.Component {

    performSearch = (query) => {
        if( query ) {
            this.props.search(query)
            navigate("/search")
        }
    }

    render = () => <SearchBar {...this.props} onSearch={this.performSearch} />
}

export const ConnectedSearchBar = connect(null, { search })(HOCSearchBar)