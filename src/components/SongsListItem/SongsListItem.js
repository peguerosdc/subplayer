import React, {useState, useEffect} from "react"
import "./SongsListItem.less"

export default function SongsListItem(props) {
	const {isDragging, song, draggableRef, ...rest} = props

	return (
        <div {...rest}
        	ref={draggableRef}
            className={`song-list-item ${isDragging ? "is-dragging" : ""}`}>
            <p><b>{song.title}</b></p>
            <p>{song.artist} in "{song.album}"</p>
        </div>
    )
}