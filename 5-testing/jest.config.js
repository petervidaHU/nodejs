module.exports = {
  testEnvironment: 'node',
  roots: ['./src'],
  preset: 'ts-jest',
  collectCoverageFrom: ['src/**'],
  coverageReporters: ['text'],
  verbose: true,
  coverageThreshold: {
    global: {
      lines: 85
    }
  }
};