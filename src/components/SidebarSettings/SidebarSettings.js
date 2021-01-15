import React, {useEffect, useState} from "react"
import { CheckboxGroup, Checkbox } from 'rsuite'
// settings
import * as settings from "../../utils/settings"

export default function SidebarSettings(props) {
    const allOptions = settings.POSSIBLE_SIDEBAR_LINKS
    const [value, setValue] = useState([])

    // load from settings
    useEffect(() => {
        setValue(settings.getSidebarDisplaySettings().map(s => s.key))
    }, [])

    // update settings
    function update_settings(newValue) {
        setValue(newValue)
        settings.setSidebarDisplaySettings(allOptions.filter(o => newValue.includes(o.key)))
    }

    return (
        <div style={{...props.style, lineHeight:"2.5em"}}>
            <CheckboxGroup name="checkboxList" value={value} onChange={update_settings}>
                <p>Select the items to display in the sidebar (NOTE: you need to refresh the site for these changes to take effect)</p>
                {
                    allOptions.map(option => (
                        <Checkbox key={option.key} value={option.key}>
                            {option.text}
                        </Checkbox>
                    ))
                }
            </CheckboxGroup>
        </div>
    )
}