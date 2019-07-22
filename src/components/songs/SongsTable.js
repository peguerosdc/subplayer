import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types'
import { addSongsToQueue } from "../../redux/actions/songsActions";
import { seconds_to_mss } from "../../utils/formatting.js"
// UI
import "./SongsTable.less"
// Table components
import { Table, Icon, IconButton, Dropdown } from 'rsuite';
const { Column, HeaderCell, Cell } = Table;

class SongsTable extends React.Component {

    songClicked = (song) => {
        // Build queue randomly with this song at the top
        var queue = this.props.songs.filter(s => s.id !== song.id)
        queue.sort(() => Math.random() - 0.5)
        queue = [song, ...queue]
        this.props.addSongsToQueue(queue)
    }

    DurationCell = ({ rowData, dataKey, onClick, ...props }) => {
      return (
        <Cell {...props} >
          {seconds_to_mss(rowData.duration)}
        </Cell>
      );
    }

    TitleCell = ({ rowData, dataKey, onClick, ...props }) => {
      return (
        <Cell {...props} >
          {rowData.title} <Icon icon='volume-up' className="icon-when-playing" />
        </Cell>
      );
    }

    render() {
        const currentSongPlaying = this.props.currentSongPlaying ? this.props.currentSongPlaying : {}
        const songs = this.props.songs
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
                        <this.TitleCell dataKey="title" />
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
                        <this.DurationCell dataKey="duration" />
                    </Column>
                    : null
                }

                { columnsToShow.includes(columns.options) ? 
                    <Column width={40}>
                        <HeaderCell/>
                        <Cell>
                            {rowData =>
                                <Dropdown placement="leftTop"
                                    renderTitle={ () => <IconButton appearance="link" icon={<Icon icon="ellipsis-v" />} size="sm" /> }>
                                    <Dropdown.Item>Add to playlist</Dropdown.Item>
                                    <Dropdown.Item>Dowload</Dropdown.Item>
                                </Dropdown>
                            }
                        </Cell>
                    </Column> : null
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