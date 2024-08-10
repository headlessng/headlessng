/* eslint-disable */
export default {
  displayName: '@headlessng/primitives',
  preset: '../../jest.preset.js',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  coverageDirectory: '../../reports/packages/@headlessng-primitives',
  coverageReporters: [['cobertura', { file: 'coverage.xml' }]],
  transform: {
    '^.+\\.(ts|mjs|js|html)$': [
      'jest-preset-angular',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
        stringifyContentPathRegex: '\\.(html|svg)$',
      },
    ],
  },
  reporters: [
    "default",
    ["jest-junit", {
      outputDirectory: "reports/packages/@headlessng-primitives",
      outputName: `results.xml`
    }]
  ],
  transformIgnorePatterns: ['node_modules/(?!.*\\.mjs$)'],
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment',
  ],
};
