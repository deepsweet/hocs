import React from 'react'
import { mount } from 'enzyme'

const Target = () => null

describe('throttleHandler', () => {
  let mockJustThrottle = null
  let throttleHandler = null

  beforeEach(() => {
    mockJustThrottle = jest.fn(() => () => {})

    jest.mock('just-throttle', () => mockJustThrottle)
    jest.resetModules()

    throttleHandler = require('../src/').default
  })

  afterAll(() => {
    jest.unmock('just-throttle')
  })

  it('should pass handler arguments through', () => {
    const EnhancedTarget = throttleHandler('testHandler')(Target)
    const mockTestHandler = jest.fn()
    const wrapper = mount(
      <EnhancedTarget testHandler={mockTestHandler} />
    )
    const testHandler = wrapper.find(Target).prop('testHandler')

    testHandler()
    mockTestHandler()

    expect(mockJustThrottle.mock.calls).toMatchSnapshot()
  })

  it('should call `e.persist()` if it has been passed', () => {
    const EnhancedTarget = throttleHandler('testHandler')(Target)
    const mockTestHandler = jest.fn()
    const mockPersist = jest.fn()
    const wrapper = mount(
      <EnhancedTarget testHandler={mockTestHandler} />
    )
    const testHandler = wrapper.find(Target).prop('testHandler')

    testHandler({ persist: mockPersist })
    mockTestHandler()

    expect(mockJustThrottle.mock.calls).toMatchSnapshot()
    expect(mockPersist.mock.calls).toMatchSnapshot()
  })

  it('should pass `interval` option to `just-throttle`', () => {
    const EnhancedTarget = throttleHandler('testHandler', 75)(Target)
    const mockTestHandler = jest.fn()
    const wrapper = mount(
      <EnhancedTarget testHandler={mockTestHandler} />
    )
    const testHandler = wrapper.find(Target).prop('testHandler')

    testHandler()
    mockTestHandler()

    expect(mockJustThrottle.mock.calls).toMatchSnapshot()
  })

  it('should pass `leadingCall` option to `just-throttle`', () => {
    const EnhancedTarget = throttleHandler('testHandler', 75, true)(Target)
    const mockTestHandler = jest.fn()
    const wrapper = mount(
      <EnhancedTarget testHandler={mockTestHandler} />
    )
    const testHandler = wrapper.find(Target).prop('testHandler')

    testHandler()
    mockTestHandler()

    expect(mockJustThrottle.mock.calls).toMatchSnapshot()
  })

  describe('display name', () => {
    const origNodeEnv = process.env.NODE_ENV

    afterAll(() => {
      process.env.NODE_ENV = origNodeEnv
    })

    it('should wrap display name in non-production env', () => {
      process.env.NODE_ENV = 'test'

      const EnhancedTarget = throttleHandler()(Target)
      const wrapper = mount(
        <EnhancedTarget />
      )

      expect(wrapper).toMatchSnapshot()
    })

    it('should not wrap display name in production env', () => {
      process.env.NODE_ENV = 'production'

      const EnhancedTarget = throttleHandler()(Target)
      const wrapper = mount(
        <EnhancedTarget />
      )

      expect(wrapper).toMatchSnapshot()
    })
  })
})
