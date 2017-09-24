/* eslint-disable max-len */
import React from 'react'
import { mount } from 'enzyme'

const Target = () => null

describe('withSafeIdleCallback', () => {
  let origRequestIdleCallback = null
  let origCancelIdleCallback = null
  let withSafeIdleCallback = null

  beforeAll(() => {
    origRequestIdleCallback = global.requestIdleCallback
    origCancelIdleCallback = global.cancelIdleCallback

    jest.resetModules()

    global.requestIdleCallback = jest.fn(() => 'id')
    global.cancelIdleCallback = jest.fn()

    withSafeIdleCallback = require('../src').withSafeIdleCallback
  })

  afterEach(() => {
    global.requestIdleCallback.mockClear()
    global.cancelIdleCallback.mockClear()
  })

  afterAll(() => {
    global.requestIdleCallback = origRequestIdleCallback
    global.cancelIdleCallback = origCancelIdleCallback
  })

  it('should pass props through', () => {
    const EnhancedTarget = withSafeIdleCallback(Target)
    const wrapper = mount(
      <EnhancedTarget a={1} b={2} />
    )

    expect(wrapper.find(Target)).toMatchSnapshot()
  })

  it('should provide `requestSafeIdleCallback` prop and unsubscriber as its call return', () => {
    const callback = () => {}
    const EnhancedTarget = withSafeIdleCallback(Target)
    const wrapper = mount(
      <EnhancedTarget />
    )
    const cancelSafeIdleCallback = wrapper.find(Target).prop('requestSafeIdleCallback')(callback, 'a', 'b')

    expect(global.requestIdleCallback.mock.calls).toMatchSnapshot()
    cancelSafeIdleCallback()
    expect(global.cancelIdleCallback.mock.calls).toMatchSnapshot()
  })

  it('should clear all safe intervals on unmount', () => {
    const EnhancedTarget = withSafeIdleCallback(Target)
    const wrapper = mount(
      <EnhancedTarget />
    )
    const requestSafeIdleCallback = wrapper.find(Target).prop('requestSafeIdleCallback')

    requestSafeIdleCallback()
    requestSafeIdleCallback()
    requestSafeIdleCallback()

    wrapper.unmount()

    expect(global.cancelIdleCallback.mock.calls).toMatchSnapshot()
  })

  describe('display name', () => {
    const origNodeEnv = process.env.NODE_ENV

    afterAll(() => {
      process.env.NODE_ENV = origNodeEnv
    })

    it('should wrap display name in non-production env', () => {
      process.env.NODE_ENV = 'test'

      const EnhancedTarget = withSafeIdleCallback(Target)
      const wrapper = mount(
        <EnhancedTarget />
      )

      expect(wrapper).toMatchSnapshot()
    })

    it('should not wrap display name in production env', () => {
      process.env.NODE_ENV = 'production'

      const EnhancedTarget = withSafeIdleCallback(Target)
      const wrapper = mount(
        <EnhancedTarget />
      )

      expect(wrapper).toMatchSnapshot()
    })
  })
})
