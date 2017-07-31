import React from 'react';
import { setDisplayName, wrapDisplayName } from 'recompose';
import omit from 'just-omit';

const omitProps = (...propsToOmit) => (Target) => {
  const OmitProps = (props) => (
    <Target {...omit(props, propsToOmit)}/>
  );

  if (process.env.NODE_ENV !== 'production') {
    return setDisplayName(wrapDisplayName(Target, 'omitProps'))(OmitProps);
  }

  return OmitProps;
};

export default omitProps;
