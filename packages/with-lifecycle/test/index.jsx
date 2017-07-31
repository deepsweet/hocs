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

  describe('as object', () => {
    it('onWillMount', (done) => {
      const EnchancedTarget = withLifecycle({
        onWillMount(...args) {
          expect(this).toBeUndefined();
          expect(args).toEqual([ { a: 1, b: 2 } ]);
          done();
        }
      })(Target);

      mount(
        <EnchancedTarget a={1} b={2}/>
      );
    });

    it('onDidMount', (done) => {
      const EnchancedTarget = withLifecycle({
        onDidMount(...args) {
          expect(this).toBeUndefined();
          expect(args).toEqual([ { a: 1, b: 2 } ]);
          done();
        }
      })(Target);

      mount(
        <EnchancedTarget a={1} b={2}/>
      );
    });

    it('onWillReceiveProps', (done) => {
      const EnchancedTarget = withLifecycle({
        onWillReceiveProps(...args) {
          expect(this).toBeUndefined();
          expect(args).toEqual([ { a: 1, b: 2 }, { a: 1, b: 2, c: 3 } ]);
          done();
        }
      })(Target);
      const wrapper = mount(
        <EnchancedTarget a={1} b={2}/>
      );

      wrapper.setProps({ c: 3 });
    });

    it('onWillUpdate', (done) => {
      const EnchancedTarget = withLifecycle({
        onWillUpdate(...args) {
          expect(this).toBeUndefined();
          expect(args).toEqual([ { a: 1, b: 2 }, { a: 1, b: 2, c: 3 } ]);
          done();
        }
      })(Target);
      const wrapper = mount(
        <EnchancedTarget a={1} b={2}/>
      );

      wrapper.setProps({ c: 3 });
    });

    it('onDidUpdate', (done) => {
      const EnchancedTarget = withLifecycle({
        onDidUpdate(...args) {
          expect(this).toBeUndefined();
          expect(args).toEqual([ { a: 1, b: 2 }, { a: 1, b: 2, c: 3 } ]);
          done();
        }
      })(Target);
      const wrapper = mount(
        <EnchancedTarget a={1} b={2}/>
      );

      wrapper.setProps({ c: 3 });
    });

    it('onWillUnmount', (done) => {
      const EnchancedTarget = withLifecycle({
        onWillUnmount(...args) {
          expect(this).toBeUndefined();
          expect(args).toEqual([ { a: 1, b: 2 } ]);
          done();
        }
      })(Target);
      const wrapper = mount(
        <EnchancedTarget a={1} b={2}/>
      );

      wrapper.unmount();
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

    it('onWillMount', (done) => {
      const EnchancedTarget = withLifecycle(
        () => ({
          onWillMount(...args) {
            expect(this).toBeUndefined();
            expect(args).toEqual([ { a: 1, b: 2 } ]);
            done();
          }
        })
      )(Target);

      mount(
        <EnchancedTarget a={1} b={2}/>
      );
    });

    it('onDidMount', (done) => {
      const EnchancedTarget = withLifecycle(
        () => ({
          onDidMount(...args) {
            expect(this).toBeUndefined();
            expect(args).toEqual([ { a: 1, b: 2 } ]);
            done();
          }
        })
      )(Target);

      mount(
        <EnchancedTarget a={1} b={2}/>
      );
    });

    it('onWillReceiveProps', (done) => {
      const EnchancedTarget = withLifecycle(
        () => ({
          onWillReceiveProps(...args) {
            expect(this).toBeUndefined();
            expect(args).toEqual([ { a: 1, b: 2 }, { a: 1, b: 2, c: 3 } ]);
            done();
          }
        })
      )(Target);
      const wrapper = mount(
        <EnchancedTarget a={1} b={2}/>
      );

      wrapper.setProps({ c: 3 });
    });

    it('onWillUpdate', (done) => {
      const EnchancedTarget = withLifecycle(
        () => ({
          onWillUpdate(...args) {
            expect(this).toBeUndefined();
            expect(args).toEqual([ { a: 1, b: 2 }, { a: 1, b: 2, c: 3 } ]);
            done();
          }
        })
      )(Target);
      const wrapper = mount(
        <EnchancedTarget a={1} b={2}/>
      );

      wrapper.setProps({ c: 3 });
    });

    it('onDidUpdate', (done) => {
      const EnchancedTarget = withLifecycle(
        () => ({
          onDidUpdate(...args) {
            expect(this).toBeUndefined();
            expect(args).toEqual([ { a: 1, b: 2 }, { a: 1, b: 2, c: 3 } ]);
            done();
          }
        })
      )(Target);
      const wrapper = mount(
        <EnchancedTarget a={1} b={2}/>
      );

      wrapper.setProps({ c: 3 });
    });

    it('onWillUnmount', (done) => {
      const EnchancedTarget = withLifecycle(
        () => ({
          onWillUnmount(...args) {
            expect(this).toBeUndefined();
            expect(args).toEqual([ { a: 1, b: 2 } ]);
            done();
          }
        })
      )(Target);
      const wrapper = mount(
        <EnchancedTarget a={1} b={2}/>
      );

      wrapper.unmount();
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
});
