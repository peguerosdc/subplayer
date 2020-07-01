import React from "react"
import PropTypes from 'prop-types'
import * as alerts from "../../redux/actions/alertsActions"
// UI
import { Alert } from 'rsuite'

export default class AlertsManager extends React.Component {

    componentDidUpdate(prevProps) {
        // Only show alerts if there is a new alert pending to show
        const alertToShow = this.props.alertToShow
        if( prevProps.alertToShow.id !== alertToShow.id){
            // Check which is the correct case of alert to display
            switch(alertToShow.type) {
                case alerts.ALERT_TYPE_SUCCESS:
                    Alert.success(alertToShow.message)
                    break
                case alerts.ALERT_TYPE_WARNING:
                    Alert.warning(alertToShow.message)
                    break
                default:
                    Alert.error(alertToShow.message)
            }
        }
    }

    render = () => null
}

AlertsManager.propTypes = {
    alertToShow : PropTypes.object
}