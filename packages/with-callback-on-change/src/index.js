import { Component } from 'react';
import { createEagerFactory, setDisplayName, wrapDisplayName } from 'recompose';

const withCallbackOnChange = (propName, callback) => (Target) => {
  const factory = createEagerFactory(Target);

  class WithCallbackOnChange extends Component {
    componentWillReceiveProps(nextProps) {
      if (this.props[propName] !== nextProps[propName]) {
        callback(nextProps);
      }
    }

    render() {
      return factory(this.props);
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    return setDisplayName(wrapDisplayName(Target, 'withCallbackOnChange'))(WithCallbackOnChange);
  }

  return WithCallbackOnChange;
};

export default withCallbackOnChange;
