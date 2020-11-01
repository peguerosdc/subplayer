import React, {useState, useEffect} from "react"
// Utils
import { seconds_to_mss, display_starred } from "../../utils/formatting.js"
import { sortSongsByKey, filterSongsByValue } from "../../utils/utils.js"
import PropTypes from 'prop-types'
// UI
import "./SongsList.css"
// Infinite draggable list
import AutoSizer from 'react-virtualized-auto-sizer'
import {Droppable, Draggable, DragDropContext} from 'react-beautiful-dnd'
import { FixedSizeList as List, areEqual } from 'react-window'


function reorder(list, startIndex, endIndex) {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
}

function getStyle({ provided, style, isDragging }) {
    // If you don't want any spacing between your items
    // then you could just return this.
    const combined = {...style, ...provided.draggableProps.style}
    return combined
}

const Row = React.memo(function Row(props) {
    const { data: items, index, style } = props;
    const item = items[index];
    return (
        <Draggable draggableId={item.id} index={index} key={item.id}>
            {provided => <SongItem provided={provided} song={item} style={style} />}
        </Draggable>
    )
}, areEqual)

function SongItem({ provided, song, style, isDragging }) {
    return (
        <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            style={getStyle({ provided, style, isDragging })}
            className={`item ${isDragging ? "is-dragging" : ""}`}>
            <p><b>{song.title}</b></p>
            <p>{song.artist} in "{song.album}"</p>
        </div>
    );
}

export default function SongsList(props) {
    const {style} = props
    // Pagination state
    const [items, setSongs] = useState(() => props.songs)

    function onDragEnd(result: DropResult) {
        if (!result.destination) {
            return;
        }
        if (result.source.index === result.destination.index) {
            return;
        }
        // reorder
        setSongs(reorder(items, result.source.index, result.destination.index))
    }

    // https://github.com/atlassian/react-beautiful-dnd/blob/master/stories/src/virtual/react-window/list.jsx
    // usar/instalar react-window
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="list-app" style={{...style, display:"flex", flexFlow:"column", overflow:"auto"}}>
                <AutoSizer disableWidth>
                    {({height}) => (
                        <Droppable
                            droppableId="droppable"
                            mode="virtual"
                            renderClone={(provided, snapshot, rubric) => (
                                <SongItem
                                    provided={provided}
                                    isDragging={snapshot.isDragging}
                                    song={items[rubric.source.index]} />
                            )}>
                            {provided => (
                                <List
                                    height={height}
                                    itemCount={items.length}
                                    itemSize={80}
                                    width="100%"
                                    outerRef={provided.innerRef}
                                    itemData={items} >
                                    {Row}
                                </List>
                            )}
                        </Droppable>
                    )}
                </AutoSizer>
            </div>
        </DragDropContext>
  )

}

// Properties
SongsList.propTypes = {

}

// Defaults
SongsList.defaultProps = {
    songs :[],
    style : {},
}
