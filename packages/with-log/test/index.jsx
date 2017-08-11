import React from 'react';
import { mount } from 'enzyme';

import withLog from '../src/';

const Target = () => null;

Target.displayName = 'Target';

describe('withLog', () => {
  const origNodeEnv = process.env.NODE_ENV;

  afterAll(() => {
    process.env.NODE_ENV = origNodeEnv;
  });

  it('should call console.log with the message, the displayName and the props in a non-production env', () => {
    process.env.NODE_ENV = 'test';
    const spy = jest.spyOn(global.console, 'log');
    const EnhancedTarget = withLog('message')(Target);

    mount(
      <EnhancedTarget a={1} b={2}/>
    );

    expect(spy).toBeCalledWith('message', 'Target', { a: 1, b: 2 });
    spy.mockRestore();
  });

  it('should not log in a production env', () => {
    process.env.NODE_ENV = 'production';
    const spy = jest.spyOn(global.console, 'log');
    const EnhancedTarget = withLog('message')(Target);

    mount(
      <EnhancedTarget a={1} b={2}/>
    );

    expect(spy).not.toBeCalled();
    spy.mockRestore();
  });

  describe('display name', () => {
    it('should wrap display name in non-production env', () => {
      process.env.NODE_ENV = 'test';

      const EnchancedTarget = withLog()(Target);
      const wrapper = mount(
        <EnchancedTarget/>
      );

      expect(wrapper.name()).toBe('withLog(Target)');
    });

    it('should not wrap display name in production env', () => {
      process.env.NODE_ENV = 'production';

      const EnchancedTarget = withLog()(Target);
      const wrapper = mount(
        <EnchancedTarget/>
      );

      expect(wrapper.name()).toBe('Target');
    });
  });
});
