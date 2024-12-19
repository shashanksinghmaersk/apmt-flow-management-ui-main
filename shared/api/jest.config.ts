/* eslint-disable */
export default {
  displayName: 'shared-api',
  preset: '../../jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/shared/api',
  setupFilesAfterEnv: ['../../.jest/setup-files-after-env.js'],
};
