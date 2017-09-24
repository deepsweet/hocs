import safeTimerFactory from './safeTimerFactory'

export default safeTimerFactory(
  global.setTimeout,
  global.clearTimeout,
  'setSafeTimeout',
  'withSafeTimeout'
)
