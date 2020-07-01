import React from 'react'
import { shallow } from 'enzyme'
import AlertsManager from "./AlertsManager"
import * as alerts from "../../redux/actions/alertsActions"
import { Alert } from 'rsuite'

describe("<AlertsManager />", () => {

    it("renders without crashing", () => {
        shallow( <AlertsManager /> )
    })

    it("should show a success Alert", () => {
        const alertToShow = {
            id : 1,
            type : alerts.ALERT_TYPE_SUCCESS,
            message : "message"
        }
        Alert.success = jest.fn()
        const enzymeWrapper = shallow( <AlertsManager alertToShow={{}} /> )
        enzymeWrapper.setProps({alertToShow})
        expect(Alert.success).toHaveBeenCalled()
    })
    
    it("should show a warning Alert", () => {
        const alertToShow = {
            id : 1,
            type : alerts.ALERT_TYPE_WARNING,
            message : "message"
        }
        Alert.warning = jest.fn()
        const enzymeWrapper = shallow( <AlertsManager alertToShow={{}} /> )
        enzymeWrapper.setProps({alertToShow})
        expect(Alert.warning).toHaveBeenCalled()
    })
    
    it("should show an error Alert", () => {
        const alertToShow = {
            id : 1,
            type : alerts.ALERT_TYPE_ERROR,
            message : "message"
        }
        Alert.error = jest.fn()
        const enzymeWrapper = shallow( <AlertsManager alertToShow={{}} /> )
        enzymeWrapper.setProps({alertToShow})
        expect(Alert.error).toHaveBeenCalled()
    })

})