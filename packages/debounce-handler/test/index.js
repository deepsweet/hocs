import React from 'react'
import { mount } from 'enzyme'

const Target = () => null

describe('debounceHandler', () => {
  let mockJustDebounce = null
  let debounceHandler = null

  beforeEach(() => {
    mockJustDebounce = jest.fn(() => () => {})

    jest.mock('just-debounce-it', () => mockJustDebounce)
    jest.resetModules()

    debounceHandler = require('../src/').default
  })

  afterAll(() => {
    jest.unmock('just-debounce-it')
  })

  it('should pass handler arguments through', () => {
    const EnhancedTarget = debounceHandler('testHandler')(Target)
    const mockTestHandler = jest.fn()
    const wrapper = mount(
      <EnhancedTarget testHandler={mockTestHandler} />
    )
    const testHandler = wrapper.find(Target).prop('testHandler')

    testHandler()

    expect(mockJustDebounce.mock.calls).toMatchSnapshot()
  })

  it('should call `e.persist()` if it has been passed', () => {
    const EnhancedTarget = debounceHandler('testHandler')(Target)
    const mockTestHandler = jest.fn()
    const mockPersist = jest.fn()
    const wrapper = mount(
      <EnhancedTarget testHandler={mockTestHandler} />
    )
    const testHandler = wrapper.find(Target).prop('testHandler')

    testHandler({ persist: mockPersist })

    expect(mockJustDebounce.mock.calls).toMatchSnapshot()
    expect(mockPersist.mock.calls).toMatchSnapshot()
  })

  it('should debounce handler with `delay` option', () => {
    const EnhancedTarget = debounceHandler('testHandler', 75)(Target)
    const mockTestHandler = jest.fn()
    const wrapper = mount(
      <EnhancedTarget testHandler={mockTestHandler} />
    )
    const testHandler = wrapper.find(Target).prop('testHandler')

    testHandler()

    expect(mockJustDebounce.mock.calls).toMatchSnapshot()
  })

  it('should debounce handler with `leadingCall` option', () => {
    const EnhancedTarget = debounceHandler('testHandler', 75, true)(Target)
    const mockTestHandler = jest.fn()
    const wrapper = mount(
      <EnhancedTarget testHandler={mockTestHandler} />
    )
    const testHandler = wrapper.find(Target).prop('testHandler')

    testHandler()

    expect(mockJustDebounce.mock.calls).toMatchSnapshot()
  })

  describe('display name', () => {
    const origNodeEnv = process.env.NODE_ENV

    afterEach(() => {
      process.env.NODE_ENV = origNodeEnv
    })

    it('should wrap display name in non-production env', () => {
      process.env.NODE_ENV = 'test'

      const EnhancedTarget = debounceHandler('test')(Target)
      const wrapper = mount(
        <EnhancedTarget />
      )

      expect(wrapper).toMatchSnapshot()
    })

    it('should not wrap display name in production env', () => {
      process.env.NODE_ENV = 'production'

      const EnhancedTarget = debounceHandler('test')(Target)
      const wrapper = mount(
        <EnhancedTarget />
      )

      expect(wrapper).toMatchSnapshot()
    })
  })
})
