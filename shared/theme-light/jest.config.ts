/* eslint-disable */
export default {
  displayName: 'shared-theme-light',
  preset: '../../jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/shared/theme-light',
  setupFilesAfterEnv: ['../../.jest/setup-files-after-env.js'],
};
