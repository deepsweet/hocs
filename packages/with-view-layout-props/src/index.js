import { Component } from 'react';
import { createEagerFactory, setDisplayName, wrapDisplayName } from 'recompose';

const withViewLayoutProps = (mapStateToProps, handlerName = 'onLayout') => (Target) => {
  const factory = createEagerFactory(Target);

  class WithViewLayoutProps extends Component {
    constructor(props, context) {
      super(props, context);

      this.state = {};
      this.onLayout = this.onLayout.bind(this);
    }

    onLayout({ nativeEvent: { layout } }) {
      this.setState(
        mapStateToProps(layout)
      );
    }

    render() {
      return factory({
        ...this.props,
        [handlerName]: this.onLayout,
        ...this.state
      });
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    return setDisplayName(wrapDisplayName(Target, 'withViewLayoutProps'))(WithViewLayoutProps);
  }

  return WithViewLayoutProps;
};

export default withViewLayoutProps;
