/* eslint-disable no-console */
import React from 'react';
import { setDisplayName, wrapDisplayName } from 'recompose';

const withLog = (getMessageToLog = (props) => props) => (Target) => {
  if (process.env.NODE_ENV === 'production') {
    return Target;
  }

  const displayName = wrapDisplayName(Target, 'withLog');

  const WithLog = (props) => {
    console.log(`${displayName}:`, getMessageToLog(props));

    return (
      <Target {...props}/>
    );
  };

  return setDisplayName(displayName)(WithLog);
};

export default withLog;
