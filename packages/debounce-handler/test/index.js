import React from 'react';
import { mount } from 'enzyme';

import debounceHandler from '../src/';

const Target = () => null;

describe('debounceHandler', () => {
  it('should pass handler arguments through', (done) => {
    const EnhancedTarget = debounceHandler('testHandler')(Target);
    const mockTestHandler = jest.fn();
    const wrapper = mount(
      <EnhancedTarget testHandler={mockTestHandler}/>
    );
    const testHandler = wrapper.find(Target).prop('testHandler');

    testHandler('a', 'b', 'c');
    setTimeout(() => {
      expect(mockTestHandler.mock.calls).toMatchSnapshot();
      done();
    });
  });

  it('should call `e.persist()` if it has been passed', (done) => {
    const EnhancedTarget = debounceHandler('testHandler')(Target);
    const mockTestHandler = jest.fn();
    const mockPersist = jest.fn();
    const wrapper = mount(
      <EnhancedTarget testHandler={mockTestHandler}/>
    );
    const testHandler = wrapper.find(Target).prop('testHandler');

    testHandler({ persist: mockPersist });
    setTimeout(() => {
      expect(mockTestHandler.mock.calls).toMatchSnapshot();
      expect(mockPersist.mock.calls).toMatchSnapshot();
      done();
    }, 0);
  });

  it('should debounce handler with `delay` option', (done) => {
    const EnhancedTarget = debounceHandler('testHandler', 50)(Target);
    const mockTestHandler = jest.fn();
    const wrapper = mount(
      <EnhancedTarget testHandler={mockTestHandler}/>
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
          }, 40);
        }, 30);
      }, 30);
    }, 30);
  });

  it('should debounce handler with `leadingCall` option', (done) => {
    const EnhancedTarget = debounceHandler('testHandler', 50, true)(Target);
    const mockTestHandler = jest.fn();
    const wrapper = mount(
      <EnhancedTarget testHandler={mockTestHandler}/>
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

    afterEach(() => {
      process.env.NODE_ENV = origNodeEnv;
    });

    it('should wrap display name in non-production env', () => {
      process.env.NODE_ENV = 'test';

      const EnhancedTarget = debounceHandler('test')(Target);
      const wrapper = mount(
        <EnhancedTarget/>
      );

      expect(wrapper).toMatchSnapshot();
    });

    it('should not wrap display name in production env', () => {
      process.env.NODE_ENV = 'production';

      const EnhancedTarget = debounceHandler('test')(Target);
      const wrapper = mount(
        <EnhancedTarget/>
      );

      expect(wrapper).toMatchSnapshot();
    });
  });
});
