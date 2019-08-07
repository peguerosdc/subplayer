// Own imports to test
import * as actions from './apiStatusActions'
import * as types from './actionTypes'
import * as alerts from './alertsActions'

describe('async tasks actions', () => {

    it('creates BEGIN_ASYNC_OPERATION when an async task is started', () => {
        expect(actions.beginAsyncTask()).toEqual({ type: types.BEGIN_ASYNC_OPERATION })
    })

    it('creates END_ASYNC_OPERATION when an async task is finished successfully', () => {
        expect(actions.asyncTaskSuccess()).toEqual({ type: types.END_ASYNC_OPERATION })
    })

    it('creates END_ASYNC_OPERATION with an alert to show when an async task is finished successfully with a message', () => {
        const message = "message"
        expect(actions.asyncTaskSuccess(message)).toEqual({ type: types.END_ASYNC_OPERATION, ...alerts.alertSuccessObject(message) })
    })

    it('creates END_ASYNC_OPERATION when an async task is finished with a warning', () => {
        expect(actions.asyncTaskWarning()).toEqual({ type: types.END_ASYNC_OPERATION })
    })

    it('creates END_ASYNC_OPERATION with an alert to show when an async task is finished with a warning and a message', () => {
        const message = "message"
        expect(actions.asyncTaskWarning(message)).toEqual({ type: types.END_ASYNC_OPERATION, ...alerts.alertWarningObject(message) })
    })

    it('creates END_ASYNC_OPERATION when an async task is finished with an error', () => {
        expect(actions.asyncTaskError()).toEqual({ type: types.END_ASYNC_OPERATION })
    })

    it('creates END_ASYNC_OPERATION with an alert to show when an async task is finished with an error and a message', () => {
        const message = "message"
        expect(actions.asyncTaskError(message)).toEqual({ type: types.END_ASYNC_OPERATION, ...alerts.alertErrorObject(message) })
    })

})