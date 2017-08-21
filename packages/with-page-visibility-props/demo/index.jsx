import React from 'react';
import { compose } from 'recompose';
import withLog from '@hocs/with-log';

import withPageVisibilityProps from '../src/';

const Demo = () => (
  <h1>Switch to another tab, go back here and check console logs.</h1>
);

export default compose(
  withPageVisibilityProps({
    isVisible: 'visible',
    isHidden: 'hidden',
    isPrerendering: 'prerender',
    isUnloaded: 'unloaded'
  }),
  withLog()
)(Demo);
