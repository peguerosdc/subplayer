import React from 'react'
import { shallow } from 'enzyme'
import { AuthenticatedComponent } from "./AuthComponentDecorators"

describe("<AuthenticatedComponent />", () => {

    it("renders without crashing", () => {
        shallow( <AuthenticatedComponent /> )
    })

    it("should try to lazy log in when the user is not authenticated", () => {
        const lazyLoginUser = jest.fn()
        const enzymeWrapper = shallow( <AuthenticatedComponent isAuthenticated={false} lazyLoginUser={lazyLoginUser} /> )
        expect( lazyLoginUser ).toHaveBeenCalled()
    })

    it("should not render anything when authenticating", () => {
        const enzymeWrapper = shallow( <AuthenticatedComponent isAuthenticating={true} /> )
        expect( enzymeWrapper.debug() ).toEqual("<div />")
    })

    it("should redirect to log in when not authenticated", () => {
        const enzymeWrapper = shallow( <AuthenticatedComponent isAuthenticating={false} isAuthenticated={false} /> )
        expect( enzymeWrapper.find("Redirect") ).toHaveLength(1)
    })

    it("should render children when authenticated", () => {
        const enzymeWrapper = shallow(
            <AuthenticatedComponent isAuthenticating={false} isAuthenticated={true}>
                <div id="child"/>
            </AuthenticatedComponent>
        )
        expect( enzymeWrapper.find("#child") ).toHaveLength(1)
    })

})