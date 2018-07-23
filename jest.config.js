module.exports = {
  "transform": {
      "^.+\\.jsx?$": "<rootDir>/node_modules/babel-jest",
      "^.+\\.tsx?$": "ts-jest"
  },
  "setupTestFrameworkScriptFile": "./setupTests.js",
  "preset": "jest-expo",
  "testEnvironment": "jsdom",
  "testRegex": "(/__tests__/.*|/src/.*\\.(test|spec))\\.(jsx?|tsx?)$",
  "transformIgnorePatterns": [],
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "ios.ts",
    "ios.tsx",
    "android.ts",
    "android.tsx"
  ]
}