import React from 'react';
import { mount } from 'enzyme';

import withLifecycle from '../src/';

const Target = () => null;

describe('withLifecycle', () => {
  it('should pass props through to the Target', () => {
    const EnchancedTarget = withLifecycle()(Target);
    const wrapper = mount(
      <EnchancedTarget a={1} b={2}/>
    );

    expect(wrapper.find(Target).props()).toEqual({ a: 1, b: 2 });
  });

  describe('as object', () => {
    it('onWillMount', () => {
      const mockOnWillMount = jest.fn();
      const EnchancedTarget = withLifecycle({ onWillMount: mockOnWillMount })(Target);

      mount(
        <EnchancedTarget a={1} b={2}/>
      );

      expect(mockOnWillMount).toHaveBeenCalledTimes(1);
      expect(mockOnWillMount).toHaveBeenCalledWith({ a: 1, b: 2 });
    });

    it('onDidMount', () => {
      const mockOnDidMount = jest.fn();
      const EnchancedTarget = withLifecycle({ onDidMount: mockOnDidMount })(Target);

      mount(
        <EnchancedTarget a={1} b={2}/>
      );

      expect(mockOnDidMount).toHaveBeenCalledTimes(1);
      expect(mockOnDidMount).toHaveBeenCalledWith({ a: 1, b: 2 });
    });

    it('onWillReceiveProps', () => {
      const mockOnWillReceiveProps = jest.fn();
      const EnchancedTarget = withLifecycle({ onWillReceiveProps: mockOnWillReceiveProps })(Target);
      const wrapper = mount(
        <EnchancedTarget a={1} b={2}/>
      );

      wrapper.setProps({ c: 3 });

      expect(mockOnWillReceiveProps).toHaveBeenCalledTimes(1);
      expect(mockOnWillReceiveProps).toHaveBeenCalledWith({ a: 1, b: 2 }, { a: 1, b: 2, c: 3 });
    });

    it('onWillUpdate', () => {
      const mockOnWillUpdate = jest.fn();
      const EnchancedTarget = withLifecycle({ onWillUpdate: mockOnWillUpdate })(Target);
      const wrapper = mount(
        <EnchancedTarget a={1} b={2}/>
      );

      wrapper.setProps({ c: 3 });

      expect(mockOnWillUpdate).toHaveBeenCalledTimes(1);
      expect(mockOnWillUpdate).toHaveBeenCalledWith({ a: 1, b: 2 }, { a: 1, b: 2, c: 3 });
    });

    it('onDidUpdate', () => {
      const mockOnDidUpdate = jest.fn();
      const EnchancedTarget = withLifecycle({ onDidUpdate: mockOnDidUpdate })(Target);
      const wrapper = mount(
        <EnchancedTarget a={1} b={2}/>
      );

      wrapper.setProps({ c: 3 });

      expect(mockOnDidUpdate).toHaveBeenCalledTimes(1);
      expect(mockOnDidUpdate).toHaveBeenCalledWith({ a: 1, b: 2 }, { a: 1, b: 2, c: 3 });
    });

    it('onWillUnmount', () => {
      const mockOnWillUnmount = jest.fn();
      const EnchancedTarget = withLifecycle({ onWillUnmount: mockOnWillUnmount })(Target);
      const wrapper = mount(
        <EnchancedTarget a={1} b={2}/>
      );

      wrapper.unmount();

      expect(mockOnWillUnmount).toHaveBeenCalledTimes(1);
      expect(mockOnWillUnmount).toHaveBeenCalledWith({ a: 1, b: 2 });
    });

    it('multiple', () => {
      const mockOnWillMount = jest.fn();
      const mockOnDidMount = jest.fn();
      const EnchancedTarget = withLifecycle({
        onWillMount: mockOnWillMount,
        onDidMount: mockOnDidMount
      })(Target);

      mount(
        <EnchancedTarget/>
      );

      expect(mockOnWillMount).toHaveBeenCalledTimes(1);
      expect(mockOnDidMount).toHaveBeenCalledTimes(1);
    });
  });

  describe('as factory', () => {
    it('should call factory functions with props', () => {
      const mockFactory = jest.fn();
      const EnchancedTarget = withLifecycle(mockFactory)(Target);

      mount(
        <EnchancedTarget a={1} b={2}/>
      );

      expect(mockFactory).toHaveBeenCalledWith({ a: 1, b: 2 });
    });

    it('onWillMount', () => {
      const mockOnWillMount = jest.fn();
      const EnchancedTarget = withLifecycle(
        () => ({ onWillMount: mockOnWillMount })
      )(Target);

      mount(
        <EnchancedTarget a={1} b={2}/>
      );

      expect(mockOnWillMount).toHaveBeenCalledTimes(1);
      expect(mockOnWillMount).toHaveBeenCalledWith({ a: 1, b: 2 });
    });

    it('onDidMount', () => {
      const mockOnDidMount = jest.fn();
      const EnchancedTarget = withLifecycle(
        () => ({ onDidMount: mockOnDidMount })
      )(Target);

      mount(
        <EnchancedTarget a={1} b={2}/>
      );

      expect(mockOnDidMount).toHaveBeenCalledTimes(1);
      expect(mockOnDidMount).toHaveBeenCalledWith({ a: 1, b: 2 });
    });

    it('onWillReceiveProps', () => {
      const mockOnWillReceiveProps = jest.fn();
      const EnchancedTarget = withLifecycle(
        () => ({ onWillReceiveProps: mockOnWillReceiveProps })
      )(Target);
      const wrapper = mount(
        <EnchancedTarget a={1} b={2}/>
      );

      wrapper.setProps({ c: 3 });

      expect(mockOnWillReceiveProps).toHaveBeenCalledTimes(1);
      expect(mockOnWillReceiveProps).toHaveBeenCalledWith({ a: 1, b: 2 }, { a: 1, b: 2, c: 3 });
    });

    it('onWillUpdate', () => {
      const mockOnWillUpdate = jest.fn();
      const EnchancedTarget = withLifecycle(
        () => ({ onWillUpdate: mockOnWillUpdate })
      )(Target);
      const wrapper = mount(
        <EnchancedTarget a={1} b={2}/>
      );

      wrapper.setProps({ c: 3 });

      expect(mockOnWillUpdate).toHaveBeenCalledTimes(1);
      expect(mockOnWillUpdate).toHaveBeenCalledWith({ a: 1, b: 2 }, { a: 1, b: 2, c: 3 });
    });

    it('onDidUpdate', () => {
      const mockOnDidUpdate = jest.fn();
      const EnchancedTarget = withLifecycle(
        () => ({ onDidUpdate: mockOnDidUpdate })
      )(Target);
      const wrapper = mount(
        <EnchancedTarget a={1} b={2}/>
      );

      wrapper.setProps({ c: 3 });

      expect(mockOnDidUpdate).toHaveBeenCalledTimes(1);
      expect(mockOnDidUpdate).toHaveBeenCalledWith({ a: 1, b: 2 }, { a: 1, b: 2, c: 3 });
    });

    it('onWillUnmount', () => {
      const mockOnWillUnmount = jest.fn();
      const EnchancedTarget = withLifecycle(
        () => ({ onWillUnmount: mockOnWillUnmount })
      )(Target);
      const wrapper = mount(
        <EnchancedTarget a={1} b={2}/>
      );

      wrapper.unmount();

      expect(mockOnWillUnmount).toHaveBeenCalledTimes(1);
      expect(mockOnWillUnmount).toHaveBeenCalledWith({ a: 1, b: 2 });
    });

    it('multiple', () => {
      const mockOnWillMount = jest.fn();
      const mockOnDidMount = jest.fn();
      const EnchancedTarget = withLifecycle(
        () => ({
          onWillMount: mockOnWillMount,
          onDidMount: mockOnDidMount
        })
      )(Target);

      mount(
        <EnchancedTarget/>
      );

      expect(mockOnWillMount).toHaveBeenCalledTimes(1);
      expect(mockOnDidMount).toHaveBeenCalledTimes(1);
    });
  });

  describe('display name', () => {
    const origNodeEnv = process.env.NODE_ENV;

    afterAll(() => {
      process.env.NODE_ENV = origNodeEnv;
    });

    it('should wrap display name in non-production env', () => {
      process.env.NODE_ENV = 'test';

      const EnchancedTarget = withLifecycle()(Target);
      const wrapper = mount(
        <EnchancedTarget/>
      );

      expect(wrapper.name()).toBe('withLifecycle(Target)');
    });

    it('should not wrap display name in production env', () => {
      process.env.NODE_ENV = 'production';

      const EnchancedTarget = withLifecycle()(Target);
      const wrapper = mount(
        <EnchancedTarget/>
      );

      expect(wrapper.name()).toBe('WithLifecycle');
    });
  });
});
