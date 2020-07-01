import React from "react"
import { Location } from "@reach/router"
// Redux
import { connect } from "react-redux"
// UI
import Sidebar from './Sidebar'

/* Create a Sidebar connected to Reach's location provider */
function HOCSidebar(props) {
    const sidebarProps = props
    return (
        <Location>
            {
                props => {
                    // Get the location from reach's <Location/> to highlight the active item
                    const currentPath = props.location.pathname
                    return <Sidebar {...sidebarProps} currentLocation={currentPath} />
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
)(HOCSidebar)