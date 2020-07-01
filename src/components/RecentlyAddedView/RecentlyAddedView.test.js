import React from 'react'
import { shallow } from 'enzyme'
import RecentlyAddedView from "./RecentlyAddedView"
// Mocking redux
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe("<RecentlyAddedView />", () => {

    afterEach(() => {
        fetchMock.restore()
    })

    it("renders without crashing", () => {
        shallow( <RecentlyAddedView /> )
    })

    it("should load the latest albums and update API calls' status", () => {
        // Mock API call
        const mockResponse = {"subsonic-response": {"albumList2": {"album" : []}, "status": "ok","version": "1.9.0"}}
        fetchMock.getOnce('*', {
            body: mockResponse,
            headers: { 'content-type': 'application/json' }
        })
        // Mount component
        const beginAsyncTask = jest.fn()
        const asyncTaskSuccess = jest.fn()
        shallow( <RecentlyAddedView beginAsyncTask={beginAsyncTask} asyncTaskSuccess={asyncTaskSuccess}/> )
        // Expect calls on success
        expect(beginAsyncTask).toHaveBeenCalledTimes(1)
        // TODO: how to test this? This probably means that SubsonicAPI should be mocked separately
        // or that the api call should be made somewhere else
        // expect(asyncTaskSuccess).toHaveBeenCalledTimes(1)
    })

})