import React from "react";
import PropTypes from 'prop-types'
// UI
import { Table, Icon, IconButton, Dropdown, Popover, Whisper } from 'rsuite';
const { Cell } = Table;


class CustomWhisper extends React.Component {

    handleSelectMenuInternal = (eventKey, event) => {
        // Hide the popover
        this.trigger.hide();
        // Prevent the row in the table from receiving the "onClick" event
        event.stopPropagation()
        // Notify the callback
        this.props.handleSelectMenu && this.props.handleSelectMenu(eventKey, this.props.rowData)
    }

    render() {
        return (
            <Whisper
                placement="autoVerticalRight"
                trigger="click"
                onClick={(event) => event.stopPropagation() /* Prevent the row in the table from receiving the "onClick" event */ }
                triggerRef={ref => { this.trigger = ref }}
                speaker={
                    <Popover full>
                        <Dropdown.Menu onSelect={this.handleSelectMenuInternal}>
                            {/* Render the Dropdown.Items passed from PopoverDropdownMenu: */}
                            {this.props.options}
                        </Dropdown.Menu>
                    </Popover>
                }>
                {/* Render the IconButton passed from PopoverDropdownMenu: */}
                {this.props.children}
            </Whisper>
        )
    }
}

function PopoverDropdownMenu(props) {
        // console.log(this.props) this.props.rowData
    const { onMenuItemSelected, ...rest } = props
    return (
        <Cell {...rest} className="link-group">
            <CustomWhisper handleSelectMenu={onMenuItemSelected} rowData={rest.rowData} options={rest.children}>
                <IconButton appearance="subtle" icon={<Icon icon="ellipsis-v" />} />
            </CustomWhisper>
        </Cell>
    )
}

PopoverDropdownMenu.propTypes = {
    onMenuItemSelected : PropTypes.func
}

export default PopoverDropdownMenu;