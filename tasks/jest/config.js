const jestConfig = {
  rootDir: '.',
  roots: [
    '<rootDir>/packages/'
  ],
  testMatch: [
    '**/test/**/*.js?(x)'
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    '**/src/**/*.js?(x)'
  ],
  coverageReporters: [
    'lcov',
    'text-summary'
  ],
  transform: {
    '\\.jsx?$': './tasks/jest/transformer'
  },
  snapshotSerializers: [
    'enzyme-to-json/serializer'
  ],
  setupFiles: [
    './tasks/jest/setup'
  ],
  cacheDirectory: 'node_modules/.cache/jest'
}

export const jestConfigFull = {
  ...jestConfig,
  silent: true,
  verbose: true
}

export const jestConfigWatch = {
  ...jestConfig,
  watchAll: true
}
