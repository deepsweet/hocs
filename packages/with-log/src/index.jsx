import React from 'react';
import { getDisplayName, setDisplayName, wrapDisplayName } from 'recompose';

const withLog = (message) => (Target) => {
  if (process.env.NODE_ENV !== 'production') {
    const WithLog = (props) => {
      console.log(message, getDisplayName(Target), props);

      return (
        <Target {...props}/>
      );
    };

    return setDisplayName(wrapDisplayName(Target, 'withLog'))(WithLog);
  }

  return Target;
};

export default withLog;
