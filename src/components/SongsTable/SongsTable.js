import React from "react"
// Utils
import { seconds_to_mss, display_starred } from "../../utils/formatting.js"
import { sortSongsByKey, filterSongsByValue } from "../../utils/utils.js"
import PropTypes from 'prop-types'
import subsonic from "../../api/subsonicApi"
// UI
import "./SongsTable.less"
// Table components
import { Table, Icon, Checkbox, Whisper, Tooltip } from 'rsuite'
const { Column, HeaderCell, Cell } = Table

const CheckCell = ({ rowData, onChange, checkedKeys, dataKey, ...props }) => {

    function onClick(event) {
        // Don't propagate the event to prevent the Table from thinking that the
        // user also clicked on the row/song
        event.stopPropagation()
    }
    return (
        <Cell {...props} style={{ padding: 0 }}>
            <div style={{ lineHeight: '46px' }}>
                <Checkbox
                    value={rowData[dataKey]}
                    inline
                    onClick={onClick}
                    onChange={onChange}
                    checked={checkedKeys.some(item => item === rowData[dataKey])} />
            </div>
        </Cell>
    )
}

export default class SongsTable extends React.Component {

    constructor(props) {
        super(props)
        this.state = { checkedKeys: [], loading : false, songs : props.songs || [] }
    }

    componentDidUpdate(prevProps) {
        // Clear checked songs to prevent the SongsTable keeping track of deleted songs
        if( prevProps.songs.length !== this.props.songs.length ) {
            if( this.state.checkedKeys.length > 0 ) {
                this.setState({ checkedKeys: [] })
            }
        }
        // Update the songs that are stored in nextCheckedKeys with the new objects
        if( prevProps.songs !== this.props.songs ) {
            this.props.onSongsSelected && this.props.onSongsSelected(
                this.state.checkedKeys.map(key => this.props.songs.find(s => s.id === key) )
            )
            // Reset the songs to show with filter and sorting
            this.applyFilter(this.props.songsFilter)
        }
        // Update filter when changed
        if( prevProps.songsFilter !== this.props.songsFilter ) {
            this.applyFilter(this.props.songsFilter)
        }
    }

    /* Handle clicking on a row */

    songClicked = (song) => {
        // Check if the default behaviour is overwritten
        if( this.props.onSongClicked ) {
            this.props.onSongClicked(song)
        }
        else{
            // Build queue randomly with this song at the top
            this.props.putSongsInQueue(this.props.songs, song)
        }
    }

    preventClickPropagation = (event) => {
        event.stopPropagation()
    }

    /* Handle clicking on checkboxes */

    handleCheckAll = (value, checked) => {
        const checkedKeys = checked ? this.state.songs.map(item => item.id) : []
        this.setState({ checkedKeys })
        // Notify the parent
        this.props.onSongsSelected && this.props.onSongsSelected(
            checkedKeys.map(key => this.state.songs.find(s => s.id === key) )
        )
    }

    handleCheck = (value, checked) => {
        const { checkedKeys } = this.state
        const nextCheckedKeys = checked
            ? [...checkedKeys, value]
            : checkedKeys.filter(item => item !== value)
        this.setState({ checkedKeys: nextCheckedKeys })
        // Notify the parent
        this.props.onSongsSelected && this.props.onSongsSelected(
            nextCheckedKeys.map(key => this.state.songs.find(s => s.id === key) )
        )
    }

    /* Handle sorting */

    handleSortColumn = async (sortColumn, sortType) => {
        this.setState({loading : true})
        try {
            // Only songs that are currently displayed (maybe some were filtered out)
            // are needed to be sorted, so only sort songs in this.state.songs
            const sorted = await sortSongsByKey(this.state.songs, sortColumn, sortType)
            this.setState({sortColumn, sortType, songs: sorted })
            this.props.onSongsSorted(sorted)
        }
        catch(err) {
            console.log(err)
        }
        this.setState({loading : false})
    }

    /* Handle filtering */

    applyFilter = async (filter) => {
        this.setState({loading : true})
        try {
            // As every time the filter changes the songs displayed must change,
            // we need to filter the complete list of songs, so filter this.props.songs
            let filtered = await filterSongsByValue(this.props.songs, filter)
            // Check if the table was already sorted. If thats the case, then sort the results
            if( this.state.sortType && this.state.sortColumn ) {
                filtered = await sortSongsByKey(filtered, this.state.sortColumn, this.state.sortType)
            }
            // Reset the checkedKeys to avoid having to update the checkedKeys as well
            this.setState({songs: filtered, checkedKeys : [] })
        }
        catch(err) {
            console.log(err)
        }
        this.setState({loading : false})
    }

    render() {
        // Get table properties
        const sortable = this.props.sortable
        // Define songs data
        const currentSongPlaying = this.props.currentSongPlaying || {}
        const songs = this.state.songs
        const columnsToShow = this.props.columns || defaultColumns
        // Define Checkbox's data
        const checkedKeys = this.state.checkedKeys
        let checked = false
        let indeterminate = false
        if (checkedKeys.length === songs.length) {
            checked = true
        }
        else if (checkedKeys.length === 0) {
            checked = false
        }
        else if (checkedKeys.length > 0 && checkedKeys.length < songs.length) {
            indeterminate = true
        }
        // Render
        const heightProps = this.props.height === -1
            ? { autoHeight : true, style : {overflow:"initial"} }
            : { height : this.props.height}
        return (
            <Table
                {...heightProps}
                id="songsTable"
                onRowClick={this.songClicked}
                virtualized
                data={songs}
                className="songs-table"
                onSortColumn={this.handleSortColumn}
                sortColumn={this.state.sortColumn}
                sortType={this.state.sortType}
                loading={this.state.loading}
                rowClassName={(rowData) => rowData && rowData.id === currentSongPlaying.id ? "currently-playing" : null }>
                { columnsToShow.includes(columns.selectable) ? 
                    <Column width={50} align="center">
                        <HeaderCell style={{ padding: 0 }}>
                            <div style={{ lineHeight: '40px' }}>
                                <Checkbox
                                    id="checkAllCell"
                                    inline
                                    checked={checked}
                                    indeterminate={indeterminate}
                                    onChange={this.handleCheckAll} />
                            </div>
                        </HeaderCell>
                        <CheckCell
                            id="checkColumn"
                            dataKey="id"
                            checkedKeys={checkedKeys}
                            onChange={this.handleCheck} />
                    </Column> : null
                }
                { columnsToShow.includes(columns.title) ? 
                    <Column flexGrow={4} sortable={sortable}>
                        <HeaderCell> Title </HeaderCell>
                        <Cell dataKey="title">
                            { rowData => <p>{rowData.title} <Icon icon='volume-up' className="icon-when-playing" /></p> }
                        </Cell>
                    </Column> : null
                }

                { columnsToShow.includes(columns.artist) ? 
                    <Column flexGrow={3} sortable={sortable}>
                        <HeaderCell>Artist</HeaderCell>
                        <Cell dataKey="artist" />
                    </Column> : null
                }

                { columnsToShow.includes(columns.album) ? 
                    <Column flexGrow={2} sortable={sortable}>
                        <HeaderCell>Album</HeaderCell>
                        <Cell dataKey="album" />
                    </Column>
                    : null
                }

                { columnsToShow.includes(columns.starred) ? 
                    <Column flexGrow={2} sortable={sortable}>
                        <HeaderCell>Starred</HeaderCell>
                        <Cell dataKey="starred">
                            {rowData => display_starred(rowData.starred) }
                        </Cell>
                    </Column>
                    : null
                }

                { columnsToShow.includes(columns.bitRate) ? 
                    <Column width={60}>
                        <HeaderCell>BitRate</HeaderCell>
                        <Cell dataKey="bitRate" />
                    </Column>
                    : null
                }

                { columnsToShow.includes(columns.duration) ? 
                    <Column width={55}>
                        <HeaderCell><Icon icon='clock-o' /></HeaderCell>
                        <Cell dataKey="duration" >
                            { rowData => seconds_to_mss(rowData.duration)}
                        </Cell>
                    </Column>
                    : null
                }

                { columnsToShow.includes(columns.download) ? 
                    <Column width={55}>
                        <HeaderCell><Icon icon='download' /></HeaderCell>
                        <Cell dataKey="id">
                            { rowData => (
                                <Whisper placement="auto" trigger="hover" speaker={<Tooltip>{rowData.path}</Tooltip>}>
                                    <a href={subsonic.getDownloadUrl(rowData.id)} download={rowData.title} style={{color:"#8e8e93"}} target="_blank" rel="noopener noreferrer">
                                      <Icon icon='download' onClick={this.preventClickPropagation} />
                                    </a>
                                </Whisper>
                            )}
                        </Cell>
                    </Column>
                    : null
                }
            </Table>
        )
    }
}

/* Define possible columns to show */
const columns = {
    title: "title",
    artist: "artist",
    album: "album",
    duration: "duration",
    bitRate: "bitRate",
    selectable: "selectable",
    download: "download",
    starred: "starred"
}

// Properties
SongsTable.propTypes = {
  height : PropTypes.number,
  columns: PropTypes.arrayOf(PropTypes.string),
  sortable : PropTypes.bool,
  songsFilter : PropTypes.string,
  putSongsInQueue : PropTypes.func,
  onSongsSelected : PropTypes.func,
  onSongsSorted : PropTypes.func,
  onSongClicked : PropTypes.func
}
SongsTable.columns = columns

// Defaults
const defaultColumns = ["title", "artist", "album", "duration", "bitRate", "selectable", "download"]
SongsTable.defaultProps = {
    height : -1,
    sortable : false,
    columns : defaultColumns,
    songsFilter : null,
    putSongsInQueue: () => null,
    onSongsSelected: () => null,
    onSongsSorted: () => null,
    onSongClicked: null,
}
