module.exports = {
  preset: 'jest-preset-angular',
  setupFiles: ['./jest.polyfills.js'],
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  // globalSetup: 'jest-preset-angular/global-setup',
  testPathIgnorePatterns: ['<rootDir>/cypress/'],
  /*
    https://kulshekhar.github.io/ts-jest/docs/getting-started/paths-mapping/

    tsconfig.json
    "baseUrl": "src",    
    "paths": {
      "@app/*": ["app/*"]
    }
  */
  moduleNameMapper: {
    '^@app/(.*)$': '<rootDir>/src/app/$1',
  },
  resolver: '<rootDir>/jest-resolver.js',
  testEnvironment: 'jsdom',
};
