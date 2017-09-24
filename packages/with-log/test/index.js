/* eslint-disable no-console */
import React from 'react'
import { mount } from 'enzyme'

import withLog from '../src/'

const Target = () => null

describe('withLog', () => {
  beforeAll(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {})
  })

  afterEach(() => {
    console.log.mockClear()
  })

  afterAll(() => {
    console.log.mockRestore()
  })

  it('should log all props if no argument was passed in', () => {
    const EnhancedTarget = withLog()(Target)

    mount(
      <EnhancedTarget a={1} b={2} c={3} />
    )

    expect(console.log.mock.calls).toMatchSnapshot()
  })

  it('should call provided `getMessageToLog` with props and log its result', () => {
    const mockGetMessageToLog = jest.fn(({ a }) => `a = ${a}`)
    const EnhancedTarget = withLog(mockGetMessageToLog)(Target)

    mount(
      <EnhancedTarget a={1} b={2} c={3} />
    )

    expect(mockGetMessageToLog.mock.calls).toMatchSnapshot()
    expect(console.log.mock.calls).toMatchSnapshot()
  })

  describe('env', () => {
    const origNodeEnv = process.env.NODE_ENV

    afterAll(() => {
      process.env.NODE_ENV = origNodeEnv
    })

    it('should pass Target through in production env', () => {
      process.env.NODE_ENV = 'production'

      const EnhancedTarget = withLog()(Target)
      const wrapper = mount(
        <EnhancedTarget />
      )

      expect(wrapper).toMatchSnapshot()
    })

    it('should wrap display name in non-production env', () => {
      process.env.NODE_ENV = 'test'

      const EnhancedTarget = withLog()(Target)
      const wrapper = mount(
        <EnhancedTarget />
      )

      expect(wrapper).toMatchSnapshot()
    })
  })
})
