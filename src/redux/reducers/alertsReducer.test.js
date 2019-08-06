import alertsReducer from "./alertsReducer"

describe('alerts reducer', () => {

    it('should no nothing when an action does not contain an alert', () => {
        // Define initial state
        const initialState = {
            'id' : '1',
            'type' : 'ALERT_TYPE',
            'message' : 'message'
        }
        // Expect it to return when no specific action is triggered
        expect( alertsReducer(initialState, {}) ).toEqual(initialState)
    })

    it('should create a new alert when required by the action', () => {
        // Define initial state
        const initialState = {
            'id' : '1',
            'type' : 'ALERT_TYPE',
            'message' : 'message'
        }
        const newAlert = { alert : { type : 'NEW_TYPE', message : 'new message' } }
        // Expect it to return when no specific action is triggered
        expect( alertsReducer(initialState, newAlert) ).toMatchObject(newAlert.alert)
    })

})