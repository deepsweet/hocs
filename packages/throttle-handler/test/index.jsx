import React from 'react';
import { mount } from 'enzyme';

import throttleHandler from '../src/';

const Target = () => null;

describe('throttleHandler', () => {
  it('should pass handler arguments through', (done) => {
    const EnchancedTarget = throttleHandler('testHandler')(Target);
    const mockTestHandler = jest.fn();
    const wrapper = mount(
      <EnchancedTarget testHandler={mockTestHandler}/>
    );
    const testHandler = wrapper.find(Target).prop('testHandler');

    testHandler('a', 'b', 'c');
    setTimeout(() => {
      expect(mockTestHandler).toHaveBeenCalledTimes(1);
      expect(mockTestHandler).toHaveBeenCalledWith('a', 'b', 'c');
      done();
    });
  });

  it('should call `e.persist()` if it has been passed', (done) => {
    const EnchancedTarget = throttleHandler('testHandler')(Target);
    const mockTestHandler = jest.fn();
    const mockPersist = jest.fn();
    const wrapper = mount(
      <EnchancedTarget testHandler={mockTestHandler}/>
    );
    const testHandler = wrapper.find(Target).prop('testHandler');

    testHandler({ persist: mockPersist });
    setTimeout(() => {
      expect(mockTestHandler).toHaveBeenCalledTimes(1);
      expect(mockPersist).toHaveBeenCalledTimes(1);
      done();
    }, 0);
  });

  it('should throttle handler with `interval` option', (done) => {
    const EnchancedTarget = throttleHandler('testHandler', 50)(Target);
    const mockTestHandler = jest.fn();
    const wrapper = mount(
      <EnchancedTarget testHandler={mockTestHandler}/>
    );
    const testHandler = wrapper.find(Target).prop('testHandler');

    testHandler('a');

    setTimeout(() => {
      testHandler('b');

      setTimeout(() => {
        testHandler('c');

        setTimeout(() => {
          testHandler('d');

          setTimeout(() => {
            testHandler('e');

            setTimeout(() => {
              testHandler('f');

              setTimeout(() => {
                expect(mockTestHandler.mock.calls).toMatchSnapshot();
                done();
              }, 50);
            }, 50);
          }, 20);
        }, 20);
      }, 20);
    }, 20);
  });

  it('should throttle handler with `leadingCall` option', (done) => {
    const EnchancedTarget = throttleHandler('testHandler', 50, true)(Target);
    const mockTestHandler = jest.fn();
    const wrapper = mount(
      <EnchancedTarget testHandler={mockTestHandler}/>
    );
    const testHandler = wrapper.find(Target).prop('testHandler');

    testHandler('a');

    setTimeout(() => {
      testHandler('b');

      setTimeout(() => {
        testHandler('c');

        setTimeout(() => {
          testHandler('d');

          setTimeout(() => {
            testHandler('e');

            setTimeout(() => {
              testHandler('f');

              setTimeout(() => {
                expect(mockTestHandler.mock.calls).toMatchSnapshot();
                done();
              }, 50);
            }, 50);
          }, 20);
        }, 20);
      }, 20);
    }, 20);
  });

  describe('display name', () => {
    const origNodeEnv = process.env.NODE_ENV;

    afterAll(() => {
      process.env.NODE_ENV = origNodeEnv;
    });

    it('should wrap display name in non-production env', () => {
      process.env.NODE_ENV = 'test';

      const EnchancedTarget = throttleHandler()(Target);
      const wrapper = mount(
        <EnchancedTarget/>
      );

      expect(wrapper.name()).toBe('throttleHandler(Target)');
    });

    it('should not wrap display name in production env', () => {
      process.env.NODE_ENV = 'production';

      const EnchancedTarget = throttleHandler()(Target);
      const wrapper = mount(
        <EnchancedTarget/>
      );

      expect(wrapper.name()).toBe('ThrottleHandler');
    });
  });
});
