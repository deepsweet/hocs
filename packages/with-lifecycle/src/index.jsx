import React, { Component } from 'react';
import { setDisplayName, wrapDisplayName } from 'recompose';

export default (methodsArg) => (Target) => {
  class WithLifecycle extends Component {
    constructor(props, context) {
      super(props, context);

      const methods = typeof methodsArg === 'function' ? methodsArg(props) : methodsArg;

      if (methods) {
        if (methods.onWillMount) {
          this.componentWillMount = () => {
            methods.onWillMount(this.props);
          };
        }

        if (methods.onDidMount) {
          this.componentDidMount = () => {
            methods.onDidMount(this.props);
          };
        }

        if (methods.onWillReceiveProps) {
          this.componentWillReceiveProps = (nextProps) => {
            methods.onWillReceiveProps(this.props, nextProps);
          };
        }

        if (methods.onWillUpdate) {
          this.componentWillUpdate = (nextProps) => {
            methods.onWillUpdate(this.props, nextProps);
          };
        }

        if (methods.onDidUpdate) {
          this.componentDidUpdate = (prevProps) => {
            methods.onDidUpdate(prevProps, this.props);
          };
        }

        if (methods.onWillUnmount) {
          this.componentWillUnmount = () => {
            methods.onWillUnmount(this.props);
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
