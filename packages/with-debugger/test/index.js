import React from 'react'
import { mount } from 'enzyme'

import withDebugger from '../src/'

const Target = () => null

describe('withDebugger', () => {
  describe('env', () => {
    const origNodeEnv = process.env.NODE_ENV

    afterAll(() => {
      process.env.NODE_ENV = origNodeEnv
    })

    it('should pass Target through in production env', () => {
      process.env.NODE_ENV = 'production'

      const EnhancedTarget = withDebugger(Target)
      const wrapper = mount(
        <EnhancedTarget />
      )

      expect(wrapper).toMatchSnapshot()
    })

    it('should wrap display name in non-production env', () => {
      process.env.NODE_ENV = 'test'

      const EnhancedTarget = withDebugger(Target)
      const wrapper = mount(
        <EnhancedTarget />
      )

      expect(wrapper).toMatchSnapshot()
    })
  })
})
