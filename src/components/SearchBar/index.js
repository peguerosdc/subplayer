import React from "react"
import { navigate } from "@reach/router"
// Redux
import { connect } from "react-redux"
import { search } from "../../redux/actions/searchActions"
// UI
import SearchBar from './SearchBar'

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

export default connect(null, { search })(HOCSearchBar)