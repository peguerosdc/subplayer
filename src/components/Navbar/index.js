import React from "react"
import { Location } from "@reach/router"
// Redux
import { connect } from "react-redux"
// UI
import Navbar from './Navbar'

/* Create a Navbar connected to Reach's location provider */
function HOCNavbar(props) {
    const navbarProps = props
    return (
        <Location>
            {
                props => {
                    // Get the location from reach's <Location/> to highlight the active item
                    const currentPath = props.location.pathname
                    return <Navbar {...navbarProps} currentLocation={currentPath} />
                }
            }
        </Location>
    )
}

const mapStateToProps = (state) => {
    return {
        "playlists" : state.playlists.byId,
    }
}

export default connect(
    mapStateToProps,
    null
)(HOCNavbar)