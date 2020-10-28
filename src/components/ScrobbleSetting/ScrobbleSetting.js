import React, {useEffect, useState} from "react"
import { Toggle } from 'rsuite'
// settings
import * as settings from "../../utils/settings"

export default function ScrobbleSetting(props) {
    const [value, setValue] = useState(true)

    // load from settings
    useEffect(() => {
        const isScrobbling = settings.getIsScrobbling()
        setValue(isScrobbling)
    }, [])

    // update settings
    function update_settings(value) {
        settings.setIsScrobbling(value)
        setValue(value)
    }

    return (
        <div style={{...props.style, lineHeight:"2.5em"}}>
            Scrobble? <Toggle style={{marginLeft:"10px"}} checked={value} onChange={update_settings} />
        </div>
    )
}