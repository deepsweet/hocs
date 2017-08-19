/* eslint-disable no-debugger */
import { createEagerFactory, setDisplayName, wrapDisplayName } from 'recompose';

const withDebugger = (Target) => {
  if (process.env.NODE_ENV === 'production') {
    return Target;
  }

  const factory = createEagerFactory(Target);
  const WithDebugger = (props) => {
    debugger;

    return factory(props);
  };

  return setDisplayName(wrapDisplayName(Target, 'withDebugger'))(WithDebugger);
};

export default withDebugger;
