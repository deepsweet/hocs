import { Component } from 'react';
import { findDOMNode } from 'react-dom';
import { createEagerFactory, setDisplayName, wrapDisplayName } from 'recompose';

const isIntersectionObserverSupported = typeof global.IntersectionObserver === 'function';

const withIntersectionObserverProps = (propsThresholds, options) => (Target) => {
  if (!isIntersectionObserverSupported) {
    return Target;
  }

  const factory = createEagerFactory(Target);

  class WithIntersectionObserverProps extends Component {
    constructor(props, context) {
      super(props, context);

      this.options = {
        ...options,
        threshold: Object.keys(propsThresholds).map((prop) => propsThresholds[prop])
      };
      this.onObserve = this.onObserve.bind(this);
    }

    componentDidMount() {
      this.domNode = findDOMNode(this);
      this.observer = new global.IntersectionObserver(this.onObserve, this.options);

      this.observer.observe(this.domNode);
    }

    componentWillUnmount() {
      this.observer.unobserve(this.domNode);
    }

    onObserve(entries) {
      this.setState(
        Object.keys(propsThresholds).reduce((totalResult, prop) => ({
          ...totalResult,
          ...entries.reduce((entriesResult, entry) => ({
            ...entriesResult,
            [prop]: entry.isIntersecting && entry.intersectionRatio >= propsThresholds[prop]
          }), {})
        }), {})
      );
    }

    render() {
      return factory({
        ...this.props,
        ...this.state
      });
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    return setDisplayName(
      wrapDisplayName(Target, 'withIntersectionObserverProps')
    )(WithIntersectionObserverProps);
  }

  return WithIntersectionObserverProps;
};

export default withIntersectionObserverProps;
