import React from 'react'
import { shallow } from 'enzyme'
import InfiniteLineLoader from "./InfiniteLineLoader"

describe("<InfiniteLineLoader />", () => {

    it("renders without crashing", () => {
        shallow( <InfiniteLineLoader /> )
    })

    it("should show the loader on demand", () => {
        const wrapper = shallow( <InfiniteLineLoader isLoading={true} /> )
        const style = wrapper.find(".loader").prop("style")
        expect(style.display).toBe("initial")
    })

    it("should hide the loader on demand", () => {
        const wrapper = shallow( <InfiniteLineLoader isLoading={false} /> )
        const style = wrapper.find(".loader").prop("style")
        expect(style.display).toBe("none")
    })

})