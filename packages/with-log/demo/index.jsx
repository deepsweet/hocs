import React from 'react';
import { compose, withProps, flattenProp, setDisplayName } from 'recompose';

import withLog from '../src/';

const Demo = (props) => (
  <h1>props: {JSON.stringify(props)}</h1>
);

export default compose(
  withProps({ nested: { a: 'a', b: 'b' }, b: 2 }),
  flattenProp('nested'),
  withLog('wait, what are the props and the displayName here?'),
  withProps({ a: 1, c: 3 }),
  setDisplayName('Demo')
)(Demo);
