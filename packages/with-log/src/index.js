/* eslint-disable no-console */
import { createEagerFactory, setDisplayName, wrapDisplayName } from 'recompose';

const withLog = (getMessageToLog = (props) => props) => (Target) => {
  if (process.env.NODE_ENV === 'production') {
    return Target;
  }

  const factory = createEagerFactory(Target);
  const displayName = wrapDisplayName(Target, 'withLog');
  const WithLog = (props) => {
    console.log(`${displayName}:`, getMessageToLog(props));

    return factory(props);
  };

  return setDisplayName(displayName)(WithLog);
};

export default withLog;
