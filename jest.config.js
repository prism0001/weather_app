export default {
  testEnvironment: 'node',
  testMatch: ['<rootDir>/backend/tests/**/*.test.js'],
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: [
    'backend/**/*.js',
    '!backend/tests/**',
    '!backend/**/node_modules/**',
  ],
  coverageDirectory: '<rootDir>/coverage',
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
  },
};