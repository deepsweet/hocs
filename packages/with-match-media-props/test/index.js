import React from 'react'
import { mount } from 'enzyme'

const Target = () => null

describe('withMatchMediaProps', () => {
  let mockJson2mq = null
  let withMatchMediaProps = null

  beforeEach(() => {
    mockJson2mq = jest.fn()

    jest.mock('json2mq', () => mockJson2mq)
    jest.resetModules()

    withMatchMediaProps = require('../src/').default
  })

  afterAll(() => {
    jest.unmock('json2mq')
  })

  describe('`window.matchMedia` is supported', () => {
    let originMatchMedia = null

    beforeAll(() => {
      originMatchMedia = global.matchMedia
    })

    beforeEach(() => {
      global.matchMedia = () => {}
    })

    afterAll(() => {
      global.matchMedia = originMatchMedia
    })

    it('should just pass props through', () => {
      const EnhancedTarget = withMatchMediaProps()(Target)
      const wrapper = mount(
        <EnhancedTarget a={1} b={2} c={3} />
      )

      expect(wrapper.find(Target)).toMatchSnapshot()
    })

    it('should pass query object to json2mq', () => {
      global.matchMedia = jest.fn(() => ({
        addListener: () => {},
        removeListener: () => {},
        matches: true
      }))

      const EnhancedTarget = withMatchMediaProps({
        test: {
          maxWidth: 300
        }
      })(Target)

      mount(
        <EnhancedTarget />
      )

      expect(mockJson2mq.mock.calls).toMatchSnapshot()
    })

    it('should set initial state and provide props with matched queries', () => {
      global.matchMedia = jest.fn(() => ({
        addListener: () => {},
        removeListener: () => {},
        matches: true
      }))

      const EnhancedTarget = withMatchMediaProps({
        test: {
          maxWidth: 300
        }
      })(Target)
      const wrapper = mount(
        <EnhancedTarget />
      )

      expect(wrapper.find(Target)).toMatchSnapshot()
    })

    it('should subscribe on mount and unsubscribe on unmount', () => {
      const mockAddListener = jest.fn()
      const mockRemoveListener = jest.fn()

      global.matchMedia = jest.fn(() => ({
        addListener: mockAddListener,
        removeListener: mockRemoveListener
      }))

      const EnhancedTarget = withMatchMediaProps({
        test: {
          maxWidth: 300
        }
      })(Target)
      const wrapper = mount(
        <EnhancedTarget />
      )

      expect(mockAddListener.mock.calls).toMatchSnapshot()
      wrapper.unmount()
      expect(mockRemoveListener.mock.calls).toMatchSnapshot()
      expect(mockRemoveListener).toHaveBeenCalledWith(mockAddListener.mock.calls[0][0])
    })

    it('should change state and provide props when query has been matched', () => {
      const mockAddListener = jest.fn()

      global.matchMedia = jest.fn(() => ({
        addListener: mockAddListener,
        removeListener: () => {},
        matches: false
      }))

      const EnhancedTarget = withMatchMediaProps({
        test: {
          maxWidth: 300
        }
      })(Target)
      const wrapper = mount(
        <EnhancedTarget />
      )

      mockAddListener.mock.calls[0][0]({ matches: true })
      wrapper.update()

      expect(wrapper.find(Target)).toMatchSnapshot()
    })

    describe('display name', () => {
      const origNodeEnv = process.env.NODE_ENV

      afterAll(() => {
        process.env.NODE_ENV = origNodeEnv
      })

      it('should wrap display name in non-production env', () => {
        process.env.NODE_ENV = 'test'

        const EnhancedTarget = withMatchMediaProps()(Target)
        const wrapper = mount(
          <EnhancedTarget />
        )

        expect(wrapper).toMatchSnapshot()
      })

      it('should not wrap display name in production env', () => {
        process.env.NODE_ENV = 'production'

        const EnhancedTarget = withMatchMediaProps()(Target)
        const wrapper = mount(
          <EnhancedTarget />
        )

        expect(wrapper).toMatchSnapshot()
      })
    })
  })

  describe('`window.matchMedia` is not supported', () => {
    it('should just pass Target component through', () => {
      const EnhancedTarget = withMatchMediaProps()(Target)
      const wrapper = mount(
        <EnhancedTarget a={1} b={2} c={3} />
      )

      expect(wrapper).toMatchSnapshot()
    })
  })
})
