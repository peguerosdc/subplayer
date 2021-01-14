import React, {useState} from 'react'
// UI
import ResponsiveTitle from '../ResponsiveTitle' 
import GenreSongs from '../GenreSongs/'
import GenresPicker from "../GenresPicker"
import { Col } from 'rsuite'

export default function GenresView(props) {
    const [genre, setGenre] = useState({})

    return (
        <div style={{display:"flex", flexFlow:"column", height:"100%", width:"100%", padding:"20px"}}>
            <div style={{display:"inline-flex", flexWrap:"wrap", alignItems:"center"}}>
                <Col sm={24} md={18}>
                    <ResponsiveTitle style={{fontWeight: "bold"}}>Genres</ResponsiveTitle>
                </Col>
                <Col sm={24} md={6}>
                    <GenresPicker style={{height:"fit-content", flexGrow:1}} displaySongCount onGenreChanged={setGenre} placement="bottomEnd" block />
                </Col>
            </div>
            <div style={{display:"flex", flex:1}}>
                <GenreSongs style={{width:"100%"}} genre={genre} />
            </div>
        </div>
    )
}
