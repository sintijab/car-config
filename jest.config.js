// https://jestjs.io/docs/en/configuration.html

module.exports = {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['src/**/**/*.js'],
  coverageDirectory: './tests/coverage',
  coveragePathIgnorePatterns: [
    '/build',
    '/node_modules/',
    '/src/registerServiceWorker',
    '/src/index',
    '/src/sw.js',
  ],
  coverageReporters: ['json', 'html'],
  coverageThreshold: {
    global: {
      functions: 40,
      lines: 40,
      branches: 0,
      statements: 40
    }
  },
  moduleFileExtensions: ['js', 'jsx'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy'
  },
  transform: {
    '^.+\\.(js|jsx)?$': 'babel-jest'
  },
  transformIgnorePatterns: [`/node_modules/`],
  setupFilesAfterEnv: ['./jest.setup.js'],
  verbose: true
}
