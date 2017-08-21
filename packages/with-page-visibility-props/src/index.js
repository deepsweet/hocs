import { Component } from 'react';
import { createEagerFactory, setDisplayName, wrapDisplayName } from 'recompose';

const isPageVisibiitySupported = global.document &&
                                 typeof global.document.visibilityState !== 'undefined';

const mapVisibilityToProps = (propsVisibility = {}) => Object.keys(propsVisibility)
  .reduce((result, prop) => ({
    ...result,
    [prop]: propsVisibility[prop] === global.document.visibilityState
  }), {});

const withPageVisibilityProps = (propsVisibility) => (Target) => {
  if (!isPageVisibiitySupported) {
    return Target;
  }

  const factory = createEagerFactory(Target);

  class WithPageVisibilityProps extends Component {
    constructor(props, context) {
      super(props, context);

      this.state = mapVisibilityToProps(propsVisibility);
      this.onVibisilityChange = this.onVibisilityChange.bind(this);
    }

    componentDidMount() {
      global.document.addEventListener('visibilitychange', this.onVibisilityChange, false);
    }

    componentWillUnmount() {
      global.document.removeEventListener('visibilitychange', this.onVibisilityChange);
    }

    onVibisilityChange() {
      this.setState(
        mapVisibilityToProps(propsVisibility)
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
      wrapDisplayName(Target, 'withPageVisibilityProps')
    )(WithPageVisibilityProps);
  }

  return WithPageVisibilityProps;
};

export default withPageVisibilityProps;
