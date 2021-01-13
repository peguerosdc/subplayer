import React, {useState, useEffect} from "react"
import PropTypes from 'prop-types'
// utils
import subsonic from "../../api/subsonicApi"
import {SelectPicker } from 'rsuite'

export default function GenresPicker(props) {
    const {beginAsyncTask, asyncTaskSuccess, asyncTaskError, onGenreChanged, displaySongCount, ...rest} = props
    const [genres, setGenres] = useState([])

    // Get the available genres
    useEffect(() => {
        const getGenres = async () => {
            // Get the available genres
            beginAsyncTask()
            try {
                const result = await subsonic.getGenres()
                asyncTaskSuccess()
                setGenres( result.map(g => ({label:`${g.value} (${displaySongCount ? g.songCount : g.albumCount})`, value:g})) )
            }
            catch(err) {
                console.log(err)
                asyncTaskError("Unable to get genres")
            }
        }
        getGenres()
    }, [beginAsyncTask, asyncTaskSuccess, asyncTaskError, displaySongCount, setGenres])

    // Notify when the value has changed
    const onValueChanged = (genre) => onGenreChanged(genre)

    return (
        <SelectPicker {...rest} id="genrePicker" onChange={onValueChanged} data={genres} cleanable={false} />
    )
}

GenresPicker.propTypes = {
    beginAsyncTask: PropTypes.func,
    asyncTaskSuccess: PropTypes.func,
    asyncTaskError: PropTypes.func,
    onGenreChanged: PropTypes.func,
    displaySongCount: PropTypes.bool
}

GenresPicker.defaultProps = {
    beginAsyncTask: ()=> null,
    asyncTaskSuccess: ()=> null,
    asyncTaskError: ()=> null,
    onGenreChanged: ()=> null,
    displaySongCount: false,
}
