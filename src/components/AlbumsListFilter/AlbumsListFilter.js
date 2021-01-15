import React, {useState} from "react"
// UI
import {RadioGroup, Radio, InputNumber, Button, Alert } from 'rsuite'
import GenresPicker from "../GenresPicker"

export default function AlbumsListFilter(props) {
    // Filter details
    const [yearFrom, setYearFrom] = useState(null)
    const [yearTo, setYearTo] = useState(null)

    // Filters selection
    const [filter, setFilter] = useState("newest")

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
            props.onFilterChanged({ filter: filter, genre:genre.value })
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
            {showGenres && <GenresPicker id="genrePicker" onGenreChanged={onGenreChanged} style={{ width: 150, marginLeft:"10px"}} /> }
            {showYears && <InputNumber id="yearFrom" onChange={val => setYearFrom(val)} placeholder="from" style={{ width: 80, marginLeft:"10px"}}/> }
            {showYears && <InputNumber id="yearTo" onChange={val => setYearTo(val)} placeholder="to" style={{ width: 80, marginLeft:"10px"}}/> }
            {showYears && <Button id="yearSearch" style={{marginLeft:"10px"}} onClick={onSearch}>Search</Button>}
        </div>
    )
}
