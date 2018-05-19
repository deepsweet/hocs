import React from 'react'
import { mount } from 'enzyme'

import withCallbackOnce from '../src/'

const Target = () => null

describe('withCallbackOnce', () => {
  it('should pass props through', () => {
    const EnhancedTarget = withCallbackOnce()(Target)
    const wrapper = mount(
      <EnhancedTarget a={1} b={2} c={3} />
    )

    expect(wrapper).toMatchSnapshot()
  })

  it('should invoke a callback when condition status has been changed', () => {
    const shouldCall = ({ a }) => a === 11
    const mockCallback = jest.fn()
    const EnhancedTarget = withCallbackOnce(shouldCall, mockCallback)(Target)
    const wrapper = mount(
      <EnhancedTarget a={1} b={2} c={3} />
    )

    expect(mockCallback.mock.calls).toMatchSnapshot()
    wrapper.setProps({ a: 11 })
    expect(mockCallback.mock.calls).toMatchSnapshot()
  })

  it('should no-op if condition status is the same', () => {
    const shouldCall = ({ b }) => b === 3
    const mockCallback = jest.fn()
    const EnhancedTarget = withCallbackOnce(shouldCall, mockCallback)(Target)
    const wrapper = mount(
      <EnhancedTarget a={1} b={2} c={3} />
    )

    expect(mockCallback.mock.calls).toMatchSnapshot()
    wrapper.setProps({ a: 11 })
    expect(mockCallback.mock.calls).toMatchSnapshot()
  })

  describe('display name', () => {
    const origNodeEnv = process.env.NODE_ENV

    afterAll(() => {
      process.env.NODE_ENV = origNodeEnv
    })

    it('should wrap display name in non-production env', () => {
      process.env.NODE_ENV = 'test'

      const EnhancedTarget = withCallbackOnce()(Target)
      const wrapper = mount(
        <EnhancedTarget />
      )

      expect(wrapper).toMatchSnapshot()
    })

    it('should not wrap display name in production env', () => {
      process.env.NODE_ENV = 'production'

      const EnhancedTarget = withCallbackOnce()(Target)
      const wrapper = mount(
        <EnhancedTarget />
      )

      expect(wrapper).toMatchSnapshot()
    })
  })
})
