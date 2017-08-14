import React from 'react';
import { mount } from 'enzyme';

const Target = () => (
  <div data-test={1}/>
);

describe('withIntersectionObserverProps', () => {
  describe('Intersection Observer API is supported', () => {
    let withIntersectionObserverProps = null;
    let origIntersectionObserver = null;

    beforeAll(() => {
      origIntersectionObserver = global.IntersectionObserver;
    });

    beforeEach(() => {
      jest.resetModules();

      global.IntersectionObserver = () => ({
        observe: () => {},
        unobserve: () => {}
      });
      withIntersectionObserverProps = require('../src/').default;
    });

    afterAll(() => {
      global.IntersectionObserver = origIntersectionObserver;
    });

    it('should register observer with DOM node on mount', () => {
      const mockObserve = jest.fn();

      global.IntersectionObserver = jest.fn(() => ({
        observe: mockObserve
      }));

      const EnhancedTarget = withIntersectionObserverProps({
        foo: 0.5,
        bar: 1
      })(Target);

      mount(
        <EnhancedTarget/>
      );

      expect(global.IntersectionObserver.mock.calls).toMatchSnapshot();
      expect(mockObserve.mock.calls).toMatchSnapshot();
    });

    it('should unregister observer with DOM node on unmount', () => {
      const mockObserve = jest.fn();
      const mockUnobserve = jest.fn();

      global.IntersectionObserver = jest.fn(() => ({
        observe: mockObserve,
        unobserve: mockUnobserve
      }));

      const EnhancedTarget = withIntersectionObserverProps({
        foo: 0.5,
        bar: 1
      })(Target);
      const wrapper = mount(
        <EnhancedTarget/>
      );

      wrapper.unmount();

      expect(mockUnobserve.mock.calls).toMatchSnapshot();
    });

    it('should pass Intersection Observer options', () => {
      global.IntersectionObserver = jest.fn(() => ({
        observe: () => {}
      }));

      const EnhancedTarget = withIntersectionObserverProps({}, { foo: 'bar' })(Target);

      mount(
        <EnhancedTarget/>
      );

      expect(global.IntersectionObserver.mock.calls).toMatchSnapshot();
    });

    it('should map observer state to boolean props', () => {
      let observerCallback = null;

      global.IntersectionObserver = jest.fn((callback) => {
        observerCallback = callback;

        return {
          observe: () => {}
        };
      });

      const EnhancedTarget = withIntersectionObserverProps({
        foo: 0.5,
        bar: 1
      })(Target);
      const wrapper = mount(
        <EnhancedTarget/>
      );
      const target = wrapper.find(Target);

      expect(target.props()).toMatchSnapshot();
      observerCallback([ { isIntersecting: false, intersectionRatio: 0.5 } ]);
      expect(target.props()).toMatchSnapshot();
      observerCallback([ { isIntersecting: true, intersectionRatio: 0.5 } ]);
      expect(target.props()).toMatchSnapshot();
      observerCallback([ { isIntersecting: true, intersectionRatio: 1 } ]);
      expect(target.props()).toMatchSnapshot();
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

        const EnhancedTarget = withIntersectionObserverProps({ test: 0 })(Target);
        const wrapper = mount(
          <EnhancedTarget/>
        );

        expect(wrapper).toMatchSnapshot();
      });

      it('should not wrap display name in production env', () => {
        process.env.NODE_ENV = 'production';

        const EnhancedTarget = withIntersectionObserverProps({ test: 0 })(Target);
        const wrapper = mount(
          <EnhancedTarget/>
        );

        expect(wrapper).toMatchSnapshot();
      });
    });
  });

  describe('Intersection Observer API is not supported', () => {
    let withIntersectionObserverProps = null;

    beforeEach(() => {
      jest.resetModules();

      withIntersectionObserverProps = require('../src/').default;
    });

    it('should just pass Target component through', () => {
      const EnhancedTarget = withIntersectionObserverProps()(Target);
      const wrapper = mount(
        <EnhancedTarget a={1} b={2} c={3}/>
      );

      expect(wrapper).toMatchSnapshot();
    });
  });
});
