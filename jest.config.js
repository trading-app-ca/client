module.exports = {
  transform: {
    '\\.[jt]sx?$': 'babel-jest', // Use babel-jest for transforming JS and JSX files
  },
  extensionsToTreatAsEsm: ['.jsx'], // Treat JSX files as ES Modules
  testEnvironment: 'jsdom', // Simulate the browser environment in Jest
  moduleNameMapper: {
    '^axios$': require.resolve('axios'), // Map axios to ensure Jest can find it
  },
  transformIgnorePatterns: ['node_modules/(?!(axios)/)'], // Transform ESM packages like axios
  moduleFileExtensions: ['js', 'jsx'], // Specify the file extensions Jest should look for
};
