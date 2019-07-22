import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types'
import { addSongsToQueue } from "../../redux/actions/songsActions";
import { addSongsToPlaylist } from "../../redux/actions/playlistsActions";
import { seconds_to_mss } from "../../utils/formatting.js"
// UI
import "./SongsTable.less"
import PopoverDropdownMenu from "./PopoverDropdownMenu.js"
// Table components
import { Table, Icon, Dropdown } from 'rsuite';
const { Column, HeaderCell, Cell } = Table;


class SongsTable extends React.Component {

    songClicked = (song) => {
        console.log("Clicked song")
        // Build queue randomly with this song at the top
        var queue = this.props.songs.filter(s => s.id !== song.id)
        queue.sort(() => Math.random() - 0.5)
        queue = [song, ...queue]
        this.props.addSongsToQueue(queue)
    }

    onSongAddedToPlaylist = (playlistId, rowData) => {
        this.props.addSongsToPlaylist(playlistId, [rowData.id])
    }

    render() {
        const currentSongPlaying = this.props.currentSongPlaying ? this.props.currentSongPlaying : {}
        const songs = this.props.songs
        const playlists = this.props.playlists ? this.props.playlists : {}
        const playlistsIds = Object.keys(playlists)
        const columnsToShow = this.props.columns ? this.props.columns : Object.keys(columns)
        return (
            <Table
                onRowClick={this.songClicked}
                virtualized
                autoHeight={true}
                data={songs}
                rowClassName={(rowData) => rowData && rowData.id === currentSongPlaying.id ? "currently_playing" : null }>
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

                { columnsToShow.includes(columns.options) ? 
                    <Column width={40}>
                        <HeaderCell/>
                        <PopoverDropdownMenu dataKey="id" onMenuItemSelected={this.onSongAddedToPlaylist}>
                            <Dropdown.Item panel style={{ padding: 10, width: 160 }}>
                                {/* Render the title depending if its possible to add to playlists */
                                    playlistsIds.length > 0 ?
                                    <p><b>Add to:</b></p> :
                                    <p><b>No playlists</b></p> 
                                }
                            </Dropdown.Item>
                            {
                                /* Render the items */
                                playlistsIds.map( id =>
                                    <Dropdown.Item key={id} eventKey={id}>{playlists[id].name}</Dropdown.Item>
                                )
                            }
                        </PopoverDropdownMenu>
                    </Column> : null
                }
            </Table>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentSongPlaying : state.songs.current,
        "playlists" : state.playlists.playlists,
    }
}

const mapDispatchToProps = { addSongsToQueue, addSongsToPlaylist }

/* Define possible columns to show */
const columns = {
  title: "title",
  artist: "artist",
  album: "album",
  duration: "duration",
  bitRate: "bitRate",
  options: "options"
}
SongsTable.propTypes = {
  appearance: PropTypes.arrayOf(Object.keys(columns))
}
SongsTable.columns = columns

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SongsTable)