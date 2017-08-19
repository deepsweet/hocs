import { createEagerFactory, setDisplayName, wrapDisplayName } from 'recompose';
import omit from 'just-omit';

const omitProps = (...propsToOmit) => (Target) => {
  const factory = createEagerFactory(Target);
  const OmitProps = (props) => factory(omit(props, propsToOmit));

  if (process.env.NODE_ENV !== 'production') {
    return setDisplayName(wrapDisplayName(Target, 'omitProps'))(OmitProps);
  }

  return OmitProps;
};

export default omitProps;
