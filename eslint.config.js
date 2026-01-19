//  @ts-check

import { tanstackConfig } from '@tanstack/eslint-config'

export default [
  ...tanstackConfig,

  {
    ignores: [
      'prettier.config.js',
      'eslint.config.js',
      // Add any other specific files or patterns that cause this error
    ],
  },
]
