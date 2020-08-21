import React, {useEffect, useState} from "react"
import PropTypes from 'prop-types'
// UI
import { Grid, Row, Col, Loader } from 'rsuite'
import AlbumResult from "../SearchAlbumResult"
import AlbumsListFilter from "../AlbumsListFilter"

export default function AlbumsList(props) {
    const {albums, loadAlbums} = props
    // filters
    const [filtering, setFiltering] = useState({filter:"random"})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const {filter, ...rest} = filtering
        setLoading(true)
        loadAlbums(filter, rest)
    }, [filtering, loadAlbums])

    useEffect(() => {
        setLoading(false)
    }, [albums])

    return (
        <Grid fluid style={{padding: "20px"}}>
            <Row>
                <Col md={24}>
                    <h1 style={{fontWeight:"bold", display: "inline-block"}}>Albums</h1>
                </Col>
                <AlbumsListFilter onFilterChanged={setFiltering} />
            </Row>
            {!loading && <Row>
                <Col md={24} className="result-grid-container" >
                    { Object.keys(albums).map(id => 
                        <div key={id} className="result-item">
                            <AlbumResult album={albums[id]} />
                        </div>
                    )}
                </Col>
            </Row>}
            {loading && <Loader size="lg" center={true} />}
        </Grid>
    )
}

AlbumsList.propTypes = {
    loadAlbums: PropTypes.func.isRequired,
    albums: PropTypes.object
}

AlbumsList.defaultProps = {
    albums: []
}
