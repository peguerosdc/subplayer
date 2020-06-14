import React from "react"
import PropTypes from 'prop-types'
// Redux
import { connect } from "react-redux"
import {beginAsyncTask, asyncTaskSuccess, asyncTaskError } from "../../redux/actions/apiStatusActions"
// Utils
import subsonic from "../../api/subsonicApi"
// UI
import { Grid, Row, Col } from 'rsuite'
import {AlbumResult} from "../search/results/AlbumResult"

export class RecentlyAdded extends React.Component {

    constructor(props) {
        super(props)
        this.state = {albums : []}
    }

    componentDidMount = async () => {
        // Get the newest albums from Subsonic
        this.props.beginAsyncTask()
        try {
            const albums = await subsonic.getAlbumList2("newest")
            this.props.asyncTaskSuccess()
            this.setState({albums})
        }
        catch(err) {
            console.log(err)
            this.props.asyncTaskError("Unable to load recently added albums")
        }
    }

    render() {
        const albums = this.state.albums
        return (
            <Grid fluid style={{padding: "20px"}}>
                <Row>
                    <Col md={24} lg={24}>
                        <h1 style={{color:"white", fontWeight:"bold", display: "inline-block"}}>Recently Added</h1>
                    </Col>
                    { albums.map( a =>
                        <Col key={a.id} sm={6} xs={12} >
                            <AlbumResult album={a} />
                        </Col>
                    )}
                </Row>
            </Grid>
        )
    }
}

RecentlyAdded.propTypes = {
    beginAsyncTask: PropTypes.func,
    asyncTaskSuccess: PropTypes.func,
    asyncTaskError : PropTypes.func,
}

RecentlyAdded.defaultProps = {
    beginAsyncTask: () => null,
    asyncTaskSuccess: () => null,
    asyncTaskError : () => null,
}

const mapDispatchToProps = { beginAsyncTask, asyncTaskSuccess, asyncTaskError }

export default connect(
    null,
    mapDispatchToProps
)(RecentlyAdded)