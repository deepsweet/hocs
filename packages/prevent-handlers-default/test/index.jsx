import React from 'react';
import { mount } from 'enzyme';

import preventHandlersDefault from '../src/';

const Target = () => null;

describe('preventHandlersDefault', () => {
  it('should pass props through if there are no arguments', () => {
    const EnchancedTarget = preventHandlersDefault()(Target);
    const wrapper = mount(
      <EnchancedTarget a={1} b={2}/>
    );

    expect(wrapper.props()).toEqual({ a: 1, b: 2 });
  });

  it('should not wrap non-existing handler', () => {
    const EnchancedTarget = preventHandlersDefault('testHandler')(Target);
    const wrapper = mount(
      <EnchancedTarget/>
    );

    expect(wrapper.find(Target).prop('testHandler')).toBeUndefined();
  });

  it('should call `preventDefault` from first argument if it has been passed to handler', () => {
    const mockPreventDefault = jest.fn();
    const testHandler = () => {};
    const EnchancedTarget = preventHandlersDefault('testHandler')(Target);
    const wrapper = mount(
      <EnchancedTarget testHandler={testHandler}/>
    );

    wrapper.find(Target).prop('testHandler')({
      preventDefault: mockPreventDefault
    });
    expect(mockPreventDefault).toHaveBeenCalledTimes(1);
  });

  it('should not fail if there is no `preventDefault` in first handler argument', () => {
    const mockTestHandler = jest.fn();
    const EnchancedTarget = preventHandlersDefault('testHandler')(Target);
    const wrapper = mount(
      <EnchancedTarget testHandler={mockTestHandler}/>
    );

    wrapper.find(Target).prop('testHandler')();
    expect(mockTestHandler).toHaveBeenCalledTimes(1);
  });

  describe('display name', () => {
    let origNodeEnv = null;

    beforeAll(() => {
      origNodeEnv = process.env.NODE_ENV;
    });

    afterAll(() => {
      process.env.NODE_ENV = origNodeEnv;
    });

    it('should wrap display name in non-production env', () => {
      process.env.NODE_ENV = 'test';

      const EnchancedTarget = preventHandlersDefault('testHandler')(Target);
      const testHandler = () => {};
      const wrapper = mount(
        <EnchancedTarget testHandler={testHandler}/>
      );

      expect(wrapper.name()).toBe('preventHandlersDefault(Target)');
    });

    it('should not wrap display name in production env', () => {
      process.env.NODE_ENV = 'production';

      const EnchancedTarget = preventHandlersDefault('testHandler')(Target);
      const testHandler = () => {};
      const wrapper = mount(
        <EnchancedTarget testHandler={testHandler}/>
      );

      expect(wrapper.name()).toBe('PreventHandlersDefault');
    });
  });
});
