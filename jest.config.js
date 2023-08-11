module.exports = {
  preset: 'ts-jest',
  clearMocks: true,
  collectCoverage: true,
  testEnvironment: "jsdom",
  coverageDirectory: "coverage",
  coverageProvider: "v8",
}
