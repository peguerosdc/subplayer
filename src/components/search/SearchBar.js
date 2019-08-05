import React from "react";
import { connect } from "react-redux";
import { navigate } from "@reach/router"
import { search } from "../../redux/actions/searchActions"
// UI
import { Input, InputGroup, Icon } from 'rsuite'

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
                <Input placeholder="Search" onChange={(value => {this.query = value})} onKeyDown={this.handleKeyDown} />
                <InputGroup.Button onClick={this.performSearch}><Icon icon="search" /></InputGroup.Button>
            </InputGroup>
        )
    }
}

SearchBar.defaultProps = {
    size : "lg",
    onSearch : (query) => {}
}

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