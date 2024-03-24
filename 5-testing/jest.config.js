module.exports = {
    testEnvironment: 'node',
    roots: ['./src'],
    preset: 'ts-jest',
    collectCoverageFrom: ['src/**'],
    coverageReporters: ['html'],
    verbose: true,
    coverageThreshold: {
        global: {
          lines: 85
        }
    }
};