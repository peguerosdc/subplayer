import React from "react";
import { connect } from "react-redux";
import { navigate } from "@reach/router"
import { search } from "../../redux/actions/searchActions"
// UI
import { Input, InputGroup, Icon } from 'rsuite'

class SearchBar extends React.Component {

    performSearch = () => {
        if( this.query ) {
            navigate("/search")
            this.props.search(this.query)
        }
    }

    handleKeyDown = (e) => {
        if( e.key === "Enter" ) {
            this.performSearch()
        }
    }

    render() {
        return (
            <InputGroup inside size="lg">
                <Input placeholder="Search" onChange={(value => {this.query = value})} onKeyDown={this.handleKeyDown} />
                <InputGroup.Button onClick={this.performSearch}><Icon icon="search" /></InputGroup.Button>
            </InputGroup>
        )
    }
}

const mapDispatchToProps = { search }

export default connect(
    null,
    mapDispatchToProps
)(SearchBar)