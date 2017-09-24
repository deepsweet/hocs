import React from 'react'
import { mount } from 'enzyme'

import preventHandlersDefault from '../src/'

const Target = () => null

describe('preventHandlersDefault', () => {
  it('should pass props through if there are no arguments', () => {
    const EnhancedTarget = preventHandlersDefault()(Target)
    const wrapper = mount(
      <EnhancedTarget a={1} b={2} />
    )

    expect(wrapper.find(Target)).toMatchSnapshot()
  })

  it('should not wrap non-existing handler', () => {
    const EnhancedTarget = preventHandlersDefault('testHandler')(Target)
    const wrapper = mount(
      <EnhancedTarget />
    )

    expect(wrapper.find(Target)).toMatchSnapshot()
  })

  it('should call `preventDefault` from first argument if it has been passed to handler', () => {
    const mockPreventDefault = jest.fn()
    const testHandler = () => {}
    const EnhancedTarget = preventHandlersDefault('testHandler')(Target)
    const wrapper = mount(
      <EnhancedTarget testHandler={testHandler} />
    )

    wrapper.find(Target).prop('testHandler')({
      preventDefault: mockPreventDefault
    })
    expect(mockPreventDefault.mock.calls).toMatchSnapshot()
  })

  it('should not fail if there is no `preventDefault` in first handler argument', () => {
    const mockTestHandler = jest.fn()
    const EnhancedTarget = preventHandlersDefault('testHandler')(Target)
    const wrapper = mount(
      <EnhancedTarget testHandler={mockTestHandler} />
    )

    wrapper.find(Target).prop('testHandler')()
    expect(mockTestHandler.mock.calls).toMatchSnapshot()
  })

  describe('display name', () => {
    const origNodeEnv = process.env.NODE_ENV

    afterAll(() => {
      process.env.NODE_ENV = origNodeEnv
    })

    it('should wrap display name in non-production env', () => {
      process.env.NODE_ENV = 'test'

      const EnhancedTarget = preventHandlersDefault('testHandler')(Target)
      const testHandler = () => {}
      const wrapper = mount(
        <EnhancedTarget testHandler={testHandler} />
      )

      expect(wrapper).toMatchSnapshot()
    })

    it('should not wrap display name in production env', () => {
      process.env.NODE_ENV = 'production'

      const EnhancedTarget = preventHandlersDefault('testHandler')(Target)
      const testHandler = () => {}
      const wrapper = mount(
        <EnhancedTarget testHandler={testHandler} />
      )

      expect(wrapper).toMatchSnapshot()
    })
  })
})
