import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types'
import { addSongsToQueue } from "../../redux/actions/songsActions";
import { seconds_to_mss } from "../../utils/formatting.js"
// UI
import "./SongsTable.less"
// Table components
import { Table, Icon, Checkbox } from 'rsuite';
const { Column, HeaderCell, Cell } = Table;

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

class SongsTable extends React.Component {

    constructor(props) {
        super(props)
        this.state = { checkedKeys: [] }
    }

    songClicked = (song) => {
        // Build queue randomly with this song at the top
        var queue = this.props.songs.filter(s => s.id !== song.id)
        queue.sort(() => Math.random() - 0.5)
        queue = [song, ...queue]
        this.props.addSongsToQueue(queue)
    }

    handleCheckAll = (value, checked) => {
        const checkedKeys = checked ? this.props.songs.map(item => item.id) : []
        this.setState({ checkedKeys })
        // Notify the parent
        this.props.onSongsSelected && this.props.onSongsSelected(
            checkedKeys.map(key => this.props.songs.find(s => s.id === key) )
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
            nextCheckedKeys.map(key => this.props.songs.find(s => s.id === key) )
        )
    }

    componentDidUpdate(prevProps) {
        // Clear checked songs to prevent the SongsTable keeping track of deleted songs
        if( prevProps.songs.length !== this.props.songs.length ) {
            if( this.state.checkedKeys.length > 0 ) {
                this.setState({ checkedKeys: [] })
            }
        }
    }

    render() {
        // Define songs data
        const currentSongPlaying = this.props.currentSongPlaying || {}
        const songs = this.props.songs || []
        const columnsToShow = this.props.columns || defaultColumns
        // Define Checkbox's data
        const checkedKeys = this.state.checkedKeys
        let checked = false;
        let indeterminate = false;
        if (checkedKeys.length === songs.length) {
            checked = true;
        }
        else if (checkedKeys.length === 0) {
            checked = false;
        }
        else if (checkedKeys.length > 0 && checkedKeys.length < songs.length) {
            indeterminate = true;
        }
        // Render
        return (
            <Table
                onRowClick={this.songClicked}
                virtualized
                autoHeight={true}
                data={songs}
                rowClassName={(rowData) => rowData && rowData.id === currentSongPlaying.id ? "currently_playing" : null }>
                { columnsToShow.includes(columns.selectable) ? 
                    <Column width={50} align="center">
                        <HeaderCell style={{ padding: 0 }}>
                            <div style={{ lineHeight: '40px' }}>
                                <Checkbox
                                    inline
                                    checked={checked}
                                    indeterminate={indeterminate}
                                    onChange={this.handleCheckAll} />
                            </div>
                        </HeaderCell>
                        <CheckCell
                            dataKey="id"
                            checkedKeys={checkedKeys}
                            onChange={this.handleCheck} />
                    </Column> : null
                }
                { columnsToShow.includes(columns.title) ? 
                    <Column flexGrow={3}>
                        <HeaderCell> Title </HeaderCell>
                        <Cell dataKey="title">
                            { rowData => 
                                <>
                                    {rowData.title} <Icon icon='volume-up' className="icon-when-playing" />
                                </>
                            }
                        </Cell>
                    </Column> : null
                }

                { columnsToShow.includes(columns.artist) ? 
                    <Column flexGrow={2}>
                        <HeaderCell>Artist</HeaderCell>
                        <Cell dataKey="artist" />
                    </Column> : null
                }

                { columnsToShow.includes(columns.album) ? 
                    <Column flexGrow={1}>
                        <HeaderCell>Album</HeaderCell>
                        <Cell dataKey="album" />
                    </Column>
                    : null
                }

                { columnsToShow.includes(columns.bitRate) ? 
                    <Column>
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
            </Table>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentSongPlaying : state.songs.current
    }
}

const mapDispatchToProps = { addSongsToQueue }

/* Define possible columns to show */
const columns = {
  title: "title",
  artist: "artist",
  album: "album",
  duration: "duration",
  bitRate: "bitRate",
  selectable: "selectable"
}
// Define defaults to show
const defaultColumns = Object.keys(columns)

// Properties
SongsTable.propTypes = {
  appearance: PropTypes.arrayOf(Object.keys(columns))
}
SongsTable.columns = columns

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SongsTable)