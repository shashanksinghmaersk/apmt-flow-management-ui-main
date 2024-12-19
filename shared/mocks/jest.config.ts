/* eslint-disable */
export default {
  displayName: 'shared-mocks',
  preset: '../../jest.preset.js',
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nx/react/plugins/jest',
    '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nx/react/babel'] }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/shared/mocks',
  setupFilesAfterEnv: ['../../.jest/setup-files-after-env.js'],
};
