module.exports = {
  transform: {'^.+\\.ts?$': 'ts-jest'},
  testEnvironment: 'node',
  testRegex: '/__tests__/.*\\.(test|spec)?\\.(ts|tsx)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  'collectCoverage': true,
  'coverageReporters': [
    'lcov',
    'text',
    'text-summary'],
  'collectCoverageFrom': [
    'source/assets/js/**/*.{js,jsx}',
    '!**/node_modules/**',
    '!**/build/**',
    '!**/coverage/**',
    '!**/test-tools/**',
  ],
  'coverageThreshold': {
    'global': {
      'branches': 0,
      'functions': 0,
      'lines': 0,
      'statements': 0
    }
  },
};
