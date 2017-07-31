import React from 'react';
import { mount } from 'enzyme';

import omitProps from '../src/';

const Target = () => null;

describe('omitProps', () => {
  it('should omit multiple props passed in as arguments', () => {
    const EnchancedTarget = omitProps('a', 'b')(Target);
    const wrapper = mount(
      <EnchancedTarget a={1} b={2} c={3}/>
    );

    expect(wrapper.find(Target).props()).toEqual({ c: 3 });
  });

  it('should do nothing with props if nothing has been passed in', () => {
    const EnchancedTarget = omitProps()(Target);
    const wrapper = mount(
      <EnchancedTarget a={1} b={2} c={3}/>
    );

    expect(wrapper.find(Target).props()).toEqual({
      a: 1,
      b: 2,
      c: 3
    });
  });

  describe('display name', () => {
    const origNodeEnv = process.env.NODE_ENV;

    afterAll(() => {
      process.env.NODE_ENV = origNodeEnv;
    });

    it('should wrap display name in non-production env', () => {
      process.env.NODE_ENV = 'test';

      const EnchancedTarget = omitProps()(Target);
      const wrapper = mount(
        <EnchancedTarget/>
      );

      expect(wrapper.name()).toBe('omitProps(Target)');
    });

    it('should not wrap display name in production env', () => {
      process.env.NODE_ENV = 'production';

      const EnchancedTarget = omitProps()(Target);
      const wrapper = mount(
        <EnchancedTarget/>
      );

      expect(wrapper.name()).toBe('OmitProps');
    });
  });
});
