import React from 'react';
import { mount } from 'enzyme';

const Target = () => null;

describe('withMatchMediaProps', () => {
  const mockJson2mq = jest.fn();
  let withMatchMediaProps = null;

  beforeAll(() => {
    withMatchMediaProps = require('../src/').default;

    jest.mock('json2mq', () => mockJson2mq);
  });

  beforeEach(() => {
    mockJson2mq.mockClear();
  });

  afterAll(() => {
    jest.unmock('json2mq');
  });

  it('should just pass props through when called without arguments', () => {
    const EnchancedTarget = withMatchMediaProps()(Target);
    const wrapper = mount(
      <EnchancedTarget a={1} b={2} c={3}/>
    );

    expect(wrapper.find(Target).props()).toEqual({ a: 1, b: 2, c: 3 });
  });

  describe('`window.matchMedia`', () => {
    let originMatchMedia = null;

    beforeAll(() => {
      originMatchMedia = global.matchMedia;
    });

    afterAll(() => {
      global.matchMedia = originMatchMedia;
    });

    it('should pass query object to json2mq', () => {
      global.matchMedia = jest.fn(() => ({
        addListener: () => {},
        removeListener: () => {},
        matches: true
      }));

      const EnchancedTarget = withMatchMediaProps({
        test: {
          maxWidth: 300
        }
      })(Target);

      mount(
        <EnchancedTarget/>
      );

      expect(mockJson2mq).toHaveBeenCalledTimes(1);
      expect(mockJson2mq).toHaveBeenCalledWith({ maxWidth: 300 });
    });

    it('should set initial state and provide props with matched queries', () => {
      global.matchMedia = jest.fn(() => ({
        addListener: () => {},
        removeListener: () => {},
        matches: true
      }));

      const EnchancedTarget = withMatchMediaProps({
        test: {
          maxWidth: 300
        }
      })(Target);
      const wrapper = mount(
        <EnchancedTarget/>
      );

      expect(wrapper.find(Target).prop('test')).toBe(true);
    });

    it('should subscribe on mount and unsubscribe on unmount', () => {
      const mockAddListener = jest.fn();
      const mockRemoveListener = jest.fn();

      global.matchMedia = jest.fn(() => ({
        addListener: mockAddListener,
        removeListener: mockRemoveListener
      }));

      const EnchancedTarget = withMatchMediaProps({
        test: {
          maxWidth: 300
        }
      })(Target);
      const wrapper = mount(
        <EnchancedTarget/>
      );

      expect(mockAddListener).toHaveBeenCalledTimes(1);
      wrapper.unmount();
      expect(mockRemoveListener).toHaveBeenCalledTimes(1);
      expect(mockRemoveListener).toHaveBeenCalledWith(mockAddListener.mock.calls[0][0]);
    });

    it('should change state and provide props when query has been matched', () => {
      const mockAddListener = jest.fn();

      global.matchMedia = jest.fn(() => ({
        addListener: mockAddListener,
        removeListener: () => {},
        matches: false
      }));

      const EnchancedTarget = withMatchMediaProps({
        test: {
          maxWidth: 300
        }
      })(Target);
      const wrapper = mount(
        <EnchancedTarget/>
      );

      mockAddListener.mock.calls[0][0]({ matches: true });
      expect(wrapper.find(Target).prop('test')).toBe(true);
    });
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

      const EnchancedTarget = withMatchMediaProps()(Target);
      const wrapper = mount(
        <EnchancedTarget/>
      );

      expect(wrapper.name()).toBe('withMatchMediaProps(Target)');
    });

    it('should not wrap display name in production env', () => {
      process.env.NODE_ENV = 'production';

      const EnchancedTarget = withMatchMediaProps()(Target);
      const wrapper = mount(
        <EnchancedTarget/>
      );

      expect(wrapper.name()).toBe('WithMatchMediaProps');
    });
  });
});
