import safeTimerFactory from './safeTimerFactory'

export default safeTimerFactory(
  global.requestAnimationFrame,
  global.cancelAnimationFrame,
  'requestSafeAnimationFrame',
  'withSafeAnimationFrame'
)
