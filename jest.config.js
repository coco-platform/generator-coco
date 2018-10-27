module.exports = {
  transform: {
    '\\.(ts|tsx)$': 'babel-jest',
  },
  moduleFileExtensions: ['js', 'json'],
  moduleDirectories: ['node_modules'],
  // Coverage report
  collectCoverageFrom: ['generators/**/*.js'],
  coverageDirectory: 'coverage',
  coverageReporters: ['lcov', 'html'],
  // Test configuration
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\]'],
  // Coverage report
  // Test configuration
  testEnvironment: 'node',
  testMatch: ['<rootDir>/__tests__/**/*.spec.js'],
  testPathIgnorePatterns: ['/node_modules/'],
};
