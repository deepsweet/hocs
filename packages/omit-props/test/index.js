import React from 'react'
import { mount } from 'enzyme'

import omitProps from '../src/'

const Target = () => null

describe('omitProps', () => {
  it('should omit multiple props passed in as arguments', () => {
    const EnhancedTarget = omitProps('a', 'b')(Target)
    const wrapper = mount(
      <EnhancedTarget a={1} b={2} c={3} />
    )

    expect(wrapper.find(Target)).toMatchSnapshot()
  })

  it('should do nothing with props if nothing has been passed in', () => {
    const EnhancedTarget = omitProps()(Target)
    const wrapper = mount(
      <EnhancedTarget a={1} b={2} c={3} />
    )

    expect(wrapper.find(Target)).toMatchSnapshot()
  })

  describe('display name', () => {
    const origNodeEnv = process.env.NODE_ENV

    afterAll(() => {
      process.env.NODE_ENV = origNodeEnv
    })

    it('should wrap display name in non-production env', () => {
      process.env.NODE_ENV = 'test'

      const EnhancedTarget = omitProps()(Target)
      const wrapper = mount(
        <EnhancedTarget />
      )

      expect(wrapper).toMatchSnapshot()
    })

    it('should not wrap display name in production env', () => {
      process.env.NODE_ENV = 'production'

      const EnhancedTarget = omitProps()(Target)
      const wrapper = mount(
        <EnhancedTarget />
      )

      expect(wrapper).toMatchSnapshot()
    })
  })
})
