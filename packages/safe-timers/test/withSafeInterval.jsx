import React from 'react';
import { mount } from 'enzyme';

const Target = () => null;

describe('withSafeInterval', () => {
  let origSetInterval = null;
  let origClearInterval = null;
  let withSafeInterval = null;

  beforeAll(() => {
    origSetInterval = global.setInterval;
    origClearInterval = global.clearInterval;

    jest.resetModules();

    global.setInterval = jest.fn(() => 'id');
    global.clearInterval = jest.fn();

    withSafeInterval = require('../src').withSafeInterval;
  });

  afterEach(() => {
    global.setInterval.mockClear();
    global.clearInterval.mockClear();
  });

  afterAll(() => {
    global.setInterval = origSetInterval;
    global.clearInterval = origClearInterval;
  });

  it('should pass props through', () => {
    const EnchancedTarget = withSafeInterval(Target);
    const wrapper = mount(
      <EnchancedTarget a={1} b={2}/>
    );
    const target = wrapper.find(Target);

    expect(target.prop('a')).toBe(1);
    expect(target.prop('b')).toBe(2);
  });

  it('should provide `setSafeInterval` prop and unsubscriber as its call return', () => {
    const callback = () => {};
    const EnchancedTarget = withSafeInterval(Target);
    const wrapper = mount(
      <EnchancedTarget/>
    );
    const clearSafeInterval = wrapper.find(Target).prop('setSafeInterval')(callback, 'a', 'b');

    expect(global.setInterval).toHaveBeenCalledTimes(1);
    expect(global.setInterval).toHaveBeenCalledWith(callback, 'a', 'b');

    clearSafeInterval();

    expect(global.clearInterval).toHaveBeenCalledTimes(1);
    expect(global.clearInterval).toHaveBeenCalledWith('id');
  });

  it('should clear all safe intervals on unmount', () => {
    const EnchancedTarget = withSafeInterval(Target);
    const wrapper = mount(
      <EnchancedTarget/>
    );
    const setSafeInterval = wrapper.find(Target).prop('setSafeInterval');

    setSafeInterval();
    setSafeInterval();
    setSafeInterval();

    wrapper.unmount();

    expect(global.clearInterval).toHaveBeenCalledTimes(3);
    expect(global.clearInterval).toHaveBeenCalledWith('id');
  });

  describe('display name', () => {
    const origNodeEnv = process.env.NODE_ENV;

    afterAll(() => {
      process.env.NODE_ENV = origNodeEnv;
    });

    it('should wrap display name in non-production env', () => {
      process.env.NODE_ENV = 'test';

      const EnchancedTarget = withSafeInterval(Target);
      const wrapper = mount(
        <EnchancedTarget/>
      );

      expect(wrapper.name()).toBe('withSafeInterval(Target)');
    });

    it('should not wrap display name in production env', () => {
      process.env.NODE_ENV = 'production';

      const EnchancedTarget = withSafeInterval(Target);
      const wrapper = mount(
        <EnchancedTarget/>
      );

      expect(wrapper.name()).toBe('SafeTimer');
    });
  });
});
