import React, { Component } from 'react';
import { setDisplayName, wrapDisplayName } from 'recompose';

const safeTimerFactory = (setFn, clearFn, propName, hocName) => (Target) => {
  class SafeTimer extends Component {
    constructor(props, context) {
      super(props, context);

      this.unsubscribers = [];
      this[propName] = this[propName].bind(this);
    }

    componentWillUnmount() {
      this.unsubscribers.forEach((unsubscribe) => unsubscribe());

      this.unsubscribers = [];
    }

    [propName](...args) {
      const id = setFn(...args);
      const unsubscriber = () => clearFn(id);

      this.unsubscribers.push(unsubscriber);

      return unsubscriber;
    }

    render() {
      const props = {
        ...this.props,
        [propName]: this[propName]
      };

      return (
        <Target {...props}/>
      );
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    return setDisplayName(wrapDisplayName(Target, hocName))(SafeTimer);
  }

  return SafeTimer;
};

export default safeTimerFactory;
