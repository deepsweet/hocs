import React from 'react';
import { mount } from 'enzyme';

import debounceHandler from '../src/';

const DELAY = 20;
const HALF_DELAY = DELAY / 2;
const Target = () => null;

describe('debounceHandler', () => {
  it('should pass handler arguments through', (done) => {
    const EnchancedTarget = debounceHandler('testHandler')(Target);
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
    const EnchancedTarget = debounceHandler('testHandler')(Target);
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

  it('should debounce handler with `delay` option', (done) => {
    const EnchancedTarget = debounceHandler('testHandler', DELAY)(Target);
    const mockTestHandler = jest.fn();
    const wrapper = mount(
      <EnchancedTarget testHandler={mockTestHandler}/>
    );
    const testHandler = wrapper.find(Target).prop('testHandler');

    testHandler('a');
    expect(mockTestHandler).toHaveBeenCalledTimes(0);

    setTimeout(() => {
      testHandler('b');
      expect(mockTestHandler).toHaveBeenCalledTimes(0);

      setTimeout(() => {
        testHandler('c');
        expect(mockTestHandler).toHaveBeenCalledTimes(0);

        setTimeout(() => {
          testHandler('d');
          expect(mockTestHandler).toHaveBeenCalledTimes(0);

          setTimeout(() => {
            expect(mockTestHandler).toHaveBeenCalledTimes(1);
            expect(mockTestHandler).toHaveBeenCalledWith('d');
            done();
          }, DELAY);
        }, HALF_DELAY);
      }, HALF_DELAY);
    }, HALF_DELAY);
  });

  it('should debounce handler with `leadingCall` option', (done) => {
    const EnchancedTarget = debounceHandler('testHandler', DELAY, true)(Target);
    const mockTestHandler = jest.fn();
    const wrapper = mount(
      <EnchancedTarget testHandler={mockTestHandler}/>
    );
    const testHandler = wrapper.find(Target).prop('testHandler');

    testHandler('a');
    expect(mockTestHandler).toHaveBeenCalledTimes(1);
    expect(mockTestHandler).toHaveBeenCalledWith('a');

    setTimeout(() => {
      testHandler('b');
      expect(mockTestHandler).toHaveBeenCalledTimes(1);
      expect(mockTestHandler).toHaveBeenCalledWith('a');

      setTimeout(() => {
        testHandler('c');
        expect(mockTestHandler).toHaveBeenCalledTimes(1);
        expect(mockTestHandler).toHaveBeenCalledWith('a');

        setTimeout(() => {
          testHandler('d');
          expect(mockTestHandler).toHaveBeenCalledTimes(1);
          expect(mockTestHandler).toHaveBeenCalledWith('a');

          setTimeout(() => {
            expect(mockTestHandler).toHaveBeenCalledTimes(2);
            expect(mockTestHandler).toHaveBeenCalledWith('d');
            done();
          }, DELAY);
        }, HALF_DELAY);
      }, HALF_DELAY);
    }, HALF_DELAY);
  });

  describe('display name', () => {
    const origNodeEnv = process.env.NODE_ENV;

    afterAll(() => {
      process.env.NODE_ENV = origNodeEnv;
    });

    it('should wrap display name in non-production env', () => {
      process.env.NODE_ENV = 'test';

      const EnchancedTarget = debounceHandler()(Target);
      const wrapper = mount(
        <EnchancedTarget/>
      );

      expect(wrapper.name()).toBe('debounceHandler(Target)');
    });

    it('should not wrap display name in production env', () => {
      process.env.NODE_ENV = 'production';

      const EnchancedTarget = debounceHandler()(Target);
      const wrapper = mount(
        <EnchancedTarget/>
      );

      expect(wrapper.name()).toBe('DebounceHandler');
    });
  });
});
