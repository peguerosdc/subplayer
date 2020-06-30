import React from 'react'
import PropTypes from 'prop-types'
// UI
import { Avatar, Col } from 'rsuite'
import "./ThemePicker.less"
// Utils
import * as utils from "../../utils/theming"

export default class ThemePicker extends React.Component {

    constructor(props) {
        super(props)
        this.themes = utils.getAvailableThemes()
    }

    render() {
        const themes = this.themes
        return (
            <>
                {
                    Object.keys(themes).map( name => (
                        <Col className="theme-element" key={name} sm={8} xs={12} onClick={ (e) => {utils.changeTheme(name)} }>
                            <Avatar className={`theme-element-color-${utils.getThemeType(name)}`} style={{ background: themes[name]["base-color"], verticalAlign:"middle" }} circle/>
                            <span style={{verticalAlign:"middle", marginLeft:"10px"}}>{utils.formatName(name)}</span>
                        </Col>
                    ))
                }
            </>
        )
    }

}