/* eslint-disable max-len */
import React from 'react';
import { mount } from 'enzyme';

const Target = () => null;

describe('withSafeAnimationFrame', () => {
  let origRequestAnimationFrame = null;
  let origCancelAnimationFrame = null;
  let withSafeAnimationFrame = null;

  beforeAll(() => {
    origRequestAnimationFrame = global.requestAnimationFrame;
    origCancelAnimationFrame = global.cancelAnimationFrame;

    jest.resetModules();

    global.requestAnimationFrame = jest.fn(() => 'id');
    global.cancelAnimationFrame = jest.fn();

    withSafeAnimationFrame = require('../src').withSafeAnimationFrame;
  });

  afterEach(() => {
    global.requestAnimationFrame.mockClear();
    global.cancelAnimationFrame.mockClear();
  });

  afterAll(() => {
    global.requestAnimationFrame = origRequestAnimationFrame;
    global.cancelAnimationFrame = origCancelAnimationFrame;
  });

  it('should pass props through', () => {
    const EnchancedTarget = withSafeAnimationFrame(Target);
    const wrapper = mount(
      <EnchancedTarget a={1} b={2}/>
    );
    const target = wrapper.find(Target);

    expect(target.prop('a')).toBe(1);
    expect(target.prop('b')).toBe(2);
  });

  it('should provide `requestSafeAnimationFrame` prop and unsubscriber as its call return', () => {
    const callback = () => {};
    const EnchancedTarget = withSafeAnimationFrame(Target);
    const wrapper = mount(
      <EnchancedTarget/>
    );
    const cancelSafeAnimationFrame = wrapper.find(Target).prop('requestSafeAnimationFrame')(callback, 'a', 'b');

    expect(global.requestAnimationFrame).toHaveBeenCalledTimes(1);
    expect(global.requestAnimationFrame).toHaveBeenCalledWith(callback, 'a', 'b');

    cancelSafeAnimationFrame();

    expect(global.cancelAnimationFrame).toHaveBeenCalledTimes(1);
    expect(global.cancelAnimationFrame).toHaveBeenCalledWith('id');
  });

  it('should clear all safe intervals on unmount', () => {
    const EnchancedTarget = withSafeAnimationFrame(Target);
    const wrapper = mount(
      <EnchancedTarget/>
    );
    const requestSafeAnimationFrame = wrapper.find(Target).prop('requestSafeAnimationFrame');

    requestSafeAnimationFrame();
    requestSafeAnimationFrame();
    requestSafeAnimationFrame();

    wrapper.unmount();

    expect(global.cancelAnimationFrame).toHaveBeenCalledTimes(3);
    expect(global.cancelAnimationFrame).toHaveBeenCalledWith('id');
  });

  describe('display name', () => {
    const origNodeEnv = process.env.NODE_ENV;

    afterAll(() => {
      process.env.NODE_ENV = origNodeEnv;
    });

    it('should wrap display name in non-production env', () => {
      process.env.NODE_ENV = 'test';

      const EnchancedTarget = withSafeAnimationFrame(Target);
      const wrapper = mount(
        <EnchancedTarget/>
      );

      expect(wrapper.name()).toBe('withSafeAnimationFrame(Target)');
    });

    it('should not wrap display name in production env', () => {
      process.env.NODE_ENV = 'production';

      const EnchancedTarget = withSafeAnimationFrame(Target);
      const wrapper = mount(
        <EnchancedTarget/>
      );

      expect(wrapper.name()).toBe('SafeTimer');
    });
  });
});
