module.exports = {
  setupFilesAfterEnv: ['<rootDir>/config/jestSetup.js'],
  testRegex: '__tests__/.*.js$',
  testURL: 'http://localhost',
  transformIgnorePatterns: ['node_modules/(?!(tradesy-ui-kit)/)'],
};
