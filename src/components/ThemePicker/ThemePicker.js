import React from 'react'
import PropTypes from 'prop-types'
// UI
import { Avatar, Col } from 'rsuite'
import "./ThemePicker.less"
// Utils
import * as utils from "../../utils/theming"

export default class ThemePicker extends React.Component {

    render() {
        const themes = this.props.themes || {}
        return (
            <>
                {
                    Object.keys(themes).map( name => (
                        <Col key={name} className="theme-element" sm={8} xs={12} onClick={ (e) => {utils.changeTheme(name)} }>
                            <Avatar className={`theme-element-color-${utils.getThemeType(name)}`} style={{ background: themes[name]["base-color"], verticalAlign:"middle" }} circle/>
                            <span data-theme-name={name} style={{verticalAlign:"middle", marginLeft:"10px"}}>{utils.formatName(name)}</span>
                        </Col>
                    ))
                }
            </>
        )
    }

}

ThemePicker.propTypes = {
    themes : PropTypes.object
}