import React, {useState, useEffect} from "react"
import PropTypes from 'prop-types'
// Utils
import subsonic from "../../api/subsonicApi"
// UI
import {RadioGroup, Radio, InputNumber, Button, SelectPicker, Alert } from 'rsuite'

export default function AlbumsListFilter(props) {
    const {beginAsyncTask, asyncTaskSuccess, asyncTaskError} = props
    // Filter details
    const [genres, setGenres] = useState([])
    const [yearFrom, setYearFrom] = useState(null)
    const [yearTo, setYearTo] = useState(null)

    // Filters selection
    const [filter, setFilter] = useState("random")

    // Get the available genres
    useEffect(() => {
        const getGenres = async () => {
            // Get the available genres
            beginAsyncTask()
            try {
                const genres = await subsonic.getGenres()
                asyncTaskSuccess()
                setGenres( genres.map(g => ({label:`${g.value} (${g.albumCount})`, value:g.value})) )
            }
            catch(err) {
                console.log(err)
                asyncTaskError("Unable to get genres")
            }
        }
        getGenres()
    }, [beginAsyncTask, asyncTaskSuccess, asyncTaskError])

    // Change the settings when the radio option has changed
    function onRadioChanged(value) {
        setFilter(value)
        // Show the years input
        if( value !== "byYear" && value !== "byGenre") {
            props.onFilterChanged({ filter: value })
        }
    }

    // On genre changed
    function onGenreChanged(genre) {
        if( genre !== null) {
            props.onFilterChanged({ filter: filter, genre:genre })
        }
    }

    // WHen the search button is pressed
    function onSearch() {
        if( filter === "byYear") {
            if( yearFrom === null || yearTo === null ) {
                Alert.warning("Both year values are required")
            }
            else {
                props.onFilterChanged({ filter: filter, from: yearFrom, to: yearTo })
            }
        }
    }

    // render
    const showYears = filter === "byYear"
    const showGenres = filter === "byGenre"
    return (
        <div style={{display:"inline-flex", flexWrap:"wrap"}}>
            <RadioGroup id="filterSelection"  defaultValue={filter} onChange={onRadioChanged} inline appearance="picker">
                <Radio value="random">Random</Radio>
                <Radio value="newest">Newest</Radio>
                <Radio value="frequent">Frequent</Radio>
                <Radio value="recent">Recent</Radio>
                <Radio value="starred">Starred</Radio>
                <Radio value="alphabeticalByName">By Name</Radio>
                <Radio value="alphabeticalByArtist">By Artist</Radio>
                <Radio value="byYear">By Year</Radio>
                <Radio value="byGenre">By Genre</Radio>
            </RadioGroup>
            {showGenres && <SelectPicker id="genrePicker" onChange={onGenreChanged} data={genres} style={{ width: 150, marginLeft:"10px"}} /> }
            {showYears && <InputNumber id="yearFrom" onChange={val => setYearFrom(val)} placeholder="from" style={{ width: 80, marginLeft:"10px"}}/> }
            {showYears && <InputNumber id="yearTo" onChange={val => setYearTo(val)} placeholder="to" style={{ width: 80, marginLeft:"10px"}}/> }
            {showYears && <Button id="yearSearch" style={{marginLeft:"10px"}} onClick={onSearch}>Search</Button>}
        </div>
    )
}

AlbumsListFilter.propTypes = {
    beginAsyncTask: PropTypes.func,
    asyncTaskSuccess: PropTypes.func,
    asyncTaskError: PropTypes.func,
    onFilterChanged: PropTypes.func,
}

AlbumsListFilter.defaultProps = {
    beginAsyncTask: ()=> null,
    asyncTaskSuccess: ()=> null,
    asyncTaskError: ()=> null,
    onFilterChanged: ()=> null,
}
