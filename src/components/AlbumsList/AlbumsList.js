import React, {useEffect, useState} from "react"
import PropTypes from 'prop-types'
// UI
import { Grid, Row, Col, Loader, Button, ButtonGroup } from 'rsuite'
import AlbumResult from "../SearchAlbumResult"
import AlbumsListFilter from "../AlbumsListFilter"

export const NavigationButtons = (props) => {
    const {page, onPrevious, onNext, disableNext, ...rest} = props
    return (
        <ButtonGroup style={{float:"right", marginRight:"15px"}} {...rest}>
            <Button onClick={onPrevious} disabled={page === 0} >
                Previous
            </Button>
            <Button onClick={onNext} disabled={disableNext} >
                Next
            </Button>
        </ButtonGroup>
    )
}

export function AlbumsList(props) {
    const {albums, loadAlbums} = props
    // filters
    const [filtering, setFiltering] = useState({filter:"newest", page:0})
    const [loading, setLoading] = useState(true)
    // next button control
    const [disableNext, setNextDisabled] = useState(false)

    // Start loading albums
    useEffect(() => {
        const {filter, page, ...rest} = filtering
        setLoading(true)
        loadAlbums(filter, rest, page)
    }, [filtering, loadAlbums])

    // Update loader when albums are ready
    useEffect(() => {
        setLoading(false)
        // disable the next button if no more albums are available. 24 albums
        // are showed per page
        setNextDisabled(albums.length < 24)
    }, [albums])

    // When a filter changes, reset everything
    const setNewFilterSettings = (newFilter) => {
        newFilter.page = 0
        setFiltering(newFilter)
    }

    // Go to next/previous
    const onPrevious = () => {
        setFiltering({...filtering, page: filtering.page-1})
    }
    const onNext = () => {
        setFiltering({...filtering, page: filtering.page+1})
    }

    return (
        <Grid fluid style={{padding: "20px"}}>
            <Row>
                <Col md={24}>
                    <h1 style={{fontWeight:"bold", display: "inline-block"}}>Albums</h1>
                </Col>
                <AlbumsListFilter id="albumsFilter" onFilterChanged={setNewFilterSettings} />
                <NavigationButtons id="pageNavigation" className="rs-hidden-xs rs-hidden-sm" page={filtering.page} onNext={onNext} onPrevious={onPrevious} disableNext={disableNext} />
            </Row>
            {!loading && <Row>
                <Col md={24} className="result-grid-container" >
                    { albums.map(album => 
                        <div key={album.id} className="result-item">
                            <AlbumResult album={album} showYear={true} />
                        </div>
                    )}
                    { albums.length === 0 && <Col md={24} style={{textAlign:"center", padding:"10%"}}>No results</Col> }
                </Col>
            </Row>}
            {loading && <Loader size="lg" center={true} />}
            <Row>
                <Col md={24} mdHidden lgHidden>
                    <NavigationButtons id="pageNavigationMobile" page={filtering.page} onNext={onNext} onPrevious={onPrevious} disableNext={disableNext} />
                </Col>
            </Row>
        </Grid>
    )
}

AlbumsList.propTypes = {
    loadAlbums: PropTypes.func.isRequired,
    albums: PropTypes.array
}

AlbumsList.defaultProps = {
    albums: []
}
