/* eslint-disable no-void */
/* eslint-disable space-unary-ops */
import React, { Component } from 'react';
import { setDisplayName, wrapDisplayName } from 'recompose';

export default (methodsArg) => (Target) => {
  class WithLifecycle extends Component {
    constructor(props, context) {
      super(props, context);

      const methods = typeof methodsArg === 'function' ? methodsArg(props) : methodsArg;

      if (methods) {
        const undef = void(0);

        if (methods.onWillMount) {
          this.componentWillMount = () => {
            methods.onWillMount.call(undef, this.props);
          };
        }

        if (methods.onDidMount) {
          this.componentDidMount = () => {
            methods.onDidMount.call(undef, this.props);
          };
        }

        if (methods.onWillReceiveProps) {
          this.componentWillReceiveProps = (nextProps) => {
            methods.onWillReceiveProps.call(undef, this.props, nextProps);
          };
        }

        if (methods.onWillUpdate) {
          this.componentWillUpdate = (nextProps) => {
            methods.onWillUpdate.call(undef, this.props, nextProps);
          };
        }

        if (methods.onDidUpdate) {
          this.componentDidUpdate = (prevProps) => {
            methods.onDidUpdate.call(undef, prevProps, this.props);
          };
        }

        if (methods.onWillUnmount) {
          this.componentWillUnmount = () => {
            methods.onWillUnmount.call(undef, this.props);
          };
        }
      }
    }

    render() {
      return (
        <Target {...this.props}/>
      );
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    return setDisplayName(wrapDisplayName(Target, 'withLifecycle'))(WithLifecycle);
  }

  return WithLifecycle;
};
