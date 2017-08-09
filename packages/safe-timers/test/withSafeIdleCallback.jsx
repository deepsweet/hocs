/* eslint-disable max-len */
import React from 'react';
import { mount } from 'enzyme';

const Target = () => null;

describe('withSafeIdleCallback', () => {
  let origRequestIdleCallback = null;
  let origCancelIdleCallback = null;
  let withSafeIdleCallback = null;

  beforeAll(() => {
    origRequestIdleCallback = global.requestIdleCallback;
    origCancelIdleCallback = global.cancelIdleCallback;

    jest.resetModules();

    global.requestIdleCallback = jest.fn(() => 'id');
    global.cancelIdleCallback = jest.fn();

    withSafeIdleCallback = require('../src').withSafeIdleCallback;
  });

  afterEach(() => {
    global.requestIdleCallback.mockClear();
    global.cancelIdleCallback.mockClear();
  });

  afterAll(() => {
    global.requestIdleCallback = origRequestIdleCallback;
    global.cancelIdleCallback = origCancelIdleCallback;
  });

  it('should pass props through', () => {
    const EnchancedTarget = withSafeIdleCallback(Target);
    const wrapper = mount(
      <EnchancedTarget a={1} b={2}/>
    );
    const target = wrapper.find(Target);

    expect(target.prop('a')).toBe(1);
    expect(target.prop('b')).toBe(2);
  });

  it('should provide `requestSafeIdleCallback` prop and unsubscriber as its call return', () => {
    const callback = () => {};
    const EnchancedTarget = withSafeIdleCallback(Target);
    const wrapper = mount(
      <EnchancedTarget/>
    );
    const cancelSafeIdleCallback = wrapper.find(Target).prop('requestSafeIdleCallback')(callback, 'a', 'b');

    expect(global.requestIdleCallback).toHaveBeenCalledTimes(1);
    expect(global.requestIdleCallback).toHaveBeenCalledWith(callback, 'a', 'b');

    cancelSafeIdleCallback();

    expect(global.cancelIdleCallback).toHaveBeenCalledTimes(1);
    expect(global.cancelIdleCallback).toHaveBeenCalledWith('id');
  });

  it('should clear all safe intervals on unmount', () => {
    const EnchancedTarget = withSafeIdleCallback(Target);
    const wrapper = mount(
      <EnchancedTarget/>
    );
    const requestSafeIdleCallback = wrapper.find(Target).prop('requestSafeIdleCallback');

    requestSafeIdleCallback();
    requestSafeIdleCallback();
    requestSafeIdleCallback();

    wrapper.unmount();

    expect(global.cancelIdleCallback).toHaveBeenCalledTimes(3);
    expect(global.cancelIdleCallback).toHaveBeenCalledWith('id');
  });

  describe('display name', () => {
    const origNodeEnv = process.env.NODE_ENV;

    afterAll(() => {
      process.env.NODE_ENV = origNodeEnv;
    });

    it('should wrap display name in non-production env', () => {
      process.env.NODE_ENV = 'test';

      const EnchancedTarget = withSafeIdleCallback(Target);
      const wrapper = mount(
        <EnchancedTarget/>
      );

      expect(wrapper.name()).toBe('withSafeIdleCallback(Target)');
    });

    it('should not wrap display name in production env', () => {
      process.env.NODE_ENV = 'production';

      const EnchancedTarget = withSafeIdleCallback(Target);
      const wrapper = mount(
        <EnchancedTarget/>
      );

      expect(wrapper.name()).toBe('SafeTimer');
    });
  });
});
