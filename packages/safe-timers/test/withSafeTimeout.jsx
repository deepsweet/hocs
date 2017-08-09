import React from 'react';
import { mount } from 'enzyme';

const Target = () => null;

describe('withSafeTimeout', () => {
  let origSetTimeout = null;
  let origClearTimeout = null;
  let withSafeTimeout = null;

  beforeAll(() => {
    origSetTimeout = global.setTimeout;
    origClearTimeout = global.clearTimeout;

    jest.resetModules();

    global.setTimeout = jest.fn(() => 'id');
    global.clearTimeout = jest.fn();

    withSafeTimeout = require('../src').withSafeTimeout;
  });

  afterEach(() => {
    global.setTimeout.mockClear();
    global.clearTimeout.mockClear();
  });

  afterAll(() => {
    global.setTimeout = origSetTimeout;
    global.clearTimeout = origClearTimeout;
  });

  it('should pass props through', () => {
    const EnchancedTarget = withSafeTimeout(Target);
    const wrapper = mount(
      <EnchancedTarget a={1} b={2}/>
    );
    const target = wrapper.find(Target);

    expect(target.prop('a')).toBe(1);
    expect(target.prop('b')).toBe(2);
  });

  it('should provide `setSafeTimeout` prop and unsubscriber as its call return', () => {
    const callback = () => {};
    const EnchancedTarget = withSafeTimeout(Target);
    const wrapper = mount(
      <EnchancedTarget/>
    );
    const clearSafeTimeout = wrapper.find(Target).prop('setSafeTimeout')(callback, 'a', 'b');

    expect(global.setTimeout).toHaveBeenCalledTimes(1);
    expect(global.setTimeout).toHaveBeenCalledWith(callback, 'a', 'b');

    clearSafeTimeout();

    expect(global.clearTimeout).toHaveBeenCalledTimes(1);
    expect(global.clearTimeout).toHaveBeenCalledWith('id');
  });

  it('should clear all safe timeouts on unmount', () => {
    const EnchancedTarget = withSafeTimeout(Target);
    const wrapper = mount(
      <EnchancedTarget/>
    );
    const setSafeTimeout = wrapper.find(Target).prop('setSafeTimeout');

    setSafeTimeout();
    setSafeTimeout();
    setSafeTimeout();

    wrapper.unmount();

    expect(global.clearTimeout).toHaveBeenCalledTimes(3);
    expect(global.clearTimeout).toHaveBeenCalledWith('id');
  });

  describe('display name', () => {
    const origNodeEnv = process.env.NODE_ENV;

    afterAll(() => {
      process.env.NODE_ENV = origNodeEnv;
    });

    it('should wrap display name in non-production env', () => {
      process.env.NODE_ENV = 'test';

      const EnchancedTarget = withSafeTimeout(Target);
      const wrapper = mount(
        <EnchancedTarget/>
      );

      expect(wrapper.name()).toBe('withSafeTimeout(Target)');
    });

    it('should not wrap display name in production env', () => {
      process.env.NODE_ENV = 'production';

      const EnchancedTarget = withSafeTimeout(Target);
      const wrapper = mount(
        <EnchancedTarget/>
      );

      expect(wrapper.name()).toBe('SafeTimer');
    });
  });
});
