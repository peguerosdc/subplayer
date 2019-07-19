import React from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types'
// Table components
import { Table, Icon, IconButton, Dropdown } from 'rsuite';
const { Column, HeaderCell, Cell } = Table;

class SongsTable extends React.Component {

    render() {
        const songs = this.props.songs
        const columnsToShow = this.props.columns ? this.props.columns : Object.keys(columns)
        return (
            <Table
                virtualized
                autoHeight={true}
                data={songs}>
                { columnsToShow.includes(columns.title) ? 
                    <Column flexGrow={2}>
                        <HeaderCell> Title </HeaderCell>
                        <Cell dataKey="title" />
                    </Column> : null
                }

                { columnsToShow.includes(columns.artist) ? 
                    <Column>
                        <HeaderCell>Artist</HeaderCell>
                        <Cell dataKey="artist" />
                    </Column> : null
                }

                { columnsToShow.includes(columns.album) ? 
                    <Column>
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
                    <Column width={50}>
                        <HeaderCell><Icon icon='clock-o' /></HeaderCell>
                        <Cell dataKey="duration" />
                    </Column>
                    : null
                }

                { columnsToShow.includes(columns.options) ? 
                    <Column width={30}>
                        <HeaderCell/>
                        <Cell>
                            {rowData =>
                                <Dropdown
                                    renderTitle={ () =>
                                        <IconButton appearance="link" icon={<Icon icon="ellipsis-v" />} size="sm" />
                                    }
                                >
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

const mapStateToProps = (state, ownProps) => {
    return {}
}

const mapDispatchToProps = {}

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