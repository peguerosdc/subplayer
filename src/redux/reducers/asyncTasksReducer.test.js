import asyncTasksReducer from "./asyncTasksReducer"
import * as apiStatusActions from "../actions/apiStatusActions"

describe('async tasks reducer', () => {

    it('should return the initial state', () => {
        // Define initial state
        const initialState = 5
        // Expect it to return when no specific action is triggered
        expect( asyncTasksReducer(initialState, {}) ).toEqual(initialState)
    })

    it('should count +1 when an async task is started', () => {
        // Define initial state and begin an async task
        const initialState = 4
        expect( asyncTasksReducer(initialState, apiStatusActions.beginAsyncTask() ) ).toEqual(4+1)
    })

    it('should count -1 when an async task ends in success', () => {
        // Define initial state and end an async task
        const initialState = 4
        expect( asyncTasksReducer(initialState, apiStatusActions.asyncTaskSuccess() ) ).toEqual(4-1)
    })

    it('should count -1 when an async task ends in warning', () => {
        // Define initial state and end an async task
        const initialState = 4
        expect( asyncTasksReducer(initialState, apiStatusActions.asyncTaskWarning() ) ).toEqual(4-1)
    })

    it('should count -1 when an async task ends in error', () => {
        // Define initial state and end an async task
        const initialState = 4
        expect( asyncTasksReducer(initialState, apiStatusActions.asyncTaskError() ) ).toEqual(4-1)
    })

})