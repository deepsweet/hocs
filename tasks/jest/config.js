import path from 'path'

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
    '\\.jsx?$': path.resolve('./tasks/jest/transformer')
  },
  snapshotSerializers: [
    'enzyme-to-json/serializer'
  ],
  setupFiles: [
    path.resolve('./tasks/jest/setup')
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
