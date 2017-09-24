import React from 'react'
import { mount } from 'enzyme'

import withCallbackOnChangeWhile from '../src/'

const Target = () => null

describe('withCallbackOnChangeWhile', () => {
  it('should pass props through', () => {
    const EnhancedTarget = withCallbackOnChangeWhile()(Target)
    const wrapper = mount(
      <EnhancedTarget a={1} b={2} c={3} />
    )

    expect(wrapper).toMatchSnapshot()
  })

  it('should invoke a callback on prop change and match condition', () => {
    const mockShouldCall = jest.fn(() => false).mockImplementationOnce(() => true)
    const mockCallback = jest.fn()
    const EnhancedTarget = withCallbackOnChangeWhile(
      'a',
      mockShouldCall,
      mockCallback
    )(Target)
    const wrapper = mount(
      <EnhancedTarget a={1} b={2} c={3} />
    )

    expect(mockShouldCall.mock.calls).toMatchSnapshot()
    expect(mockCallback.mock.calls).toMatchSnapshot()
    wrapper.setProps({ a: 11 })
    expect(mockShouldCall.mock.calls).toMatchSnapshot()
    expect(mockCallback.mock.calls).toMatchSnapshot()
    wrapper.setProps({ a: 111 })
    expect(mockShouldCall.mock.calls).toMatchSnapshot()
    expect(mockCallback.mock.calls).toMatchSnapshot()
  })

  it('should no-op if prop is the same', () => {
    const mockShouldCall = jest.fn()
    const mockCallback = jest.fn()
    const EnhancedTarget = withCallbackOnChangeWhile(
      'a',
      mockShouldCall,
      mockCallback
    )(Target)
    const wrapper = mount(
      <EnhancedTarget a={1} b={2} c={3} />
    )

    expect(mockShouldCall.mock.calls).toMatchSnapshot()
    expect(mockCallback.mock.calls).toMatchSnapshot()
    wrapper.setProps({ a: 1 })
    expect(mockShouldCall.mock.calls).toMatchSnapshot()
    expect(mockCallback.mock.calls).toMatchSnapshot()
  })

  describe('display name', () => {
    const origNodeEnv = process.env.NODE_ENV

    afterAll(() => {
      process.env.NODE_ENV = origNodeEnv
    })

    it('should wrap display name in non-production env', () => {
      process.env.NODE_ENV = 'test'

      const EnhancedTarget = withCallbackOnChangeWhile()(Target)
      const wrapper = mount(
        <EnhancedTarget />
      )

      expect(wrapper).toMatchSnapshot()
    })

    it('should not wrap display name in production env', () => {
      process.env.NODE_ENV = 'production'

      const EnhancedTarget = withCallbackOnChangeWhile()(Target)
      const wrapper = mount(
        <EnhancedTarget />
      )

      expect(wrapper).toMatchSnapshot()
    })
  })
})
