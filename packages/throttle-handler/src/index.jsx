import React, { Component } from 'react';
import { setDisplayName, wrapDisplayName } from 'recompose';
import throttle from 'just-throttle';

const throttleHandler = (handlerName, interval, leadingCall) => (Target) => {
  class ThrottleHandler extends Component {
    constructor(props, context) {
      super(props, context);

      const throttled = throttle(props[handlerName], interval, leadingCall);

      this[handlerName] = (e, ...rest) => {
        if (e && typeof e.persist === 'function') {
          e.persist();
        }

        return throttled(e, ...rest);
      };
    }

    render() {
      const newProps = {
        ...this.props,
        [handlerName]: this[handlerName]
      };

      return (
        <Target {...newProps}/>
      );
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    return setDisplayName(wrapDisplayName(Target, 'throttleHandler'))(ThrottleHandler);
  }

  return ThrottleHandler;

};

export default throttleHandler;
