import React from 'react'
import { shallow } from 'enzyme'
import LoginView from "./LoginView"
import { navigate } from "@reach/router"

jest.mock('@reach/router', () => ({
    navigate: jest.fn(),
}))

const mockedSubmitEvent = {
    target: {},
    stopPropagation : () => null,
    preventDefault : () => null,
}

describe("<LoginView />", () => {

    it("renders without crashing", () => {
        shallow( <LoginView /> )
    })

    it("should try to lazy log in when the user is not authenticated", () => {
        const lazyLoginUser = jest.fn()
        const enzymeWrapper = shallow( <LoginView isAuthenticated={false} lazyLoginUser={lazyLoginUser} /> )
        expect( lazyLoginUser ).toHaveBeenCalled()
    })

    it("should redirect to home when the user is authenticated", () => {
        const enzymeWrapper = shallow( <LoginView isAuthenticated={true} /> )
        expect( navigate ).toHaveBeenCalled()
    })

    it("should show error messages when login form is invalid", () => {
        // Mock functions and submit event
        const loginUser = jest.fn()
        // Mount
        const enzymeWrapper = shallow( <LoginView isAuthenticated={false} loginUser={loginUser} /> )
        enzymeWrapper.find("Form").simulate("submit", mockedSubmitEvent)
        // Test form is not submitted and error messages are shown
        expect( loginUser ).toHaveBeenCalledTimes(0)
        expect(typeof enzymeWrapper.find("[name='host']").prop("errorMessage")).toBe("string")
        expect(typeof enzymeWrapper.find("[name='username']").prop("errorMessage")).toBe("string")
        expect(typeof enzymeWrapper.find("[name='password']").prop("errorMessage")).toBe("string")
    })

    it("should trigger login when form is valid", () => {
        // Mock functions and submit event
        const loginUser = jest.fn()
        // Test form is submitted when setting values to fields
        const enzymeWrapper = shallow( <LoginView isAuthenticated={false} loginUser={loginUser} /> )
        enzymeWrapper.find("Form").simulate("change", {
            host : "host",
            username : "username",
            password : "password"
        })
        enzymeWrapper.find("Form").simulate("submit", mockedSubmitEvent)
        expect( loginUser ).toHaveBeenCalledTimes(1)
    })

})