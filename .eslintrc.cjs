module.exports = {
  root: true,
  extends: [
    'next/core-web-vitals',
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:tailwindcss/recommended',
    'plugin:storybook/recommended',
    'prettier',
  ],
  plugins: [
    '@typescript-eslint',
    'simple-import-sort',
    'import',
    'unused-imports',
    'tailwindcss',
    'vitest',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
  },
  rules: {
    /* eslint */
    'array-callback-return': 'error',
    'no-constructor-return': 'error',
    'no-new-native-nonconstructor': 'error',
    'no-promise-executor-return': 'error',
    'no-self-compare': 'error',
    'no-template-curly-in-string': 'error',
    'no-unreachable-loop': 'error',
    'eqeqeq': 'error',
    'no-console': 'warn',
    'no-eval': 'error',
    'no-labels': 'error',
    'no-lonely-if': 'error',
    'no-var': 'error',
    'prefer-const': 'error',
    'prefer-spread': 'error',
    'spaced-comment': ['error', 'always', { markers: ['/'] }],
    'yoda': 'error',
    /* typescript */
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
        destructuredArrayIgnorePattern: '^_',
      },
    ],
    /* import */
    'simple-import-sort/imports': 'off',
    'simple-import-sort/exports': 'error',
    'import/first': 'error',
    'import/newline-after-import': 'error',
    'import/no-duplicates': 'error',
    'unused-imports/no-unused-imports': 'error',
    'import/order': [
      'error',
      {
        'groups': [
          'builtin',
          'external',
          'parent',
          'sibling',
          'index',
          'object',
          'type',
        ],
        'pathGroups': [
          {
            pattern: '{react,react-dom/**,react-router-dom}',
            group: 'builtin',
            position: 'before',
          },
          {
            pattern: '@/app/**',
            group: 'parent',
            position: 'before',
          },
          {
            pattern: '@/components/**',
            group: 'parent',
            position: 'before',
          },
          {
            pattern: '@/stores/**',
            group: 'parent',
            position: 'before',
          },
          {
            pattern: '@/hooks/**',
            group: 'parent',
            position: 'before',
          },
          {
            pattern: '@/libs/**',
            group: 'parent',
            position: 'before',
          },
          {
            pattern: '@/utils/**',
            group: 'parent',
            position: 'before',
          },
          {
            pattern: '@/**',
            group: 'parent',
            position: 'before',
          },
        ],
        'pathGroupsExcludedImportTypes': ['builtin'],
        'alphabetize': {
          order: 'asc',
        },
        'newlines-between': 'always',
      },
    ],
    '@typescript-eslint/consistent-type-imports': [
      'error',
      {
        prefer: 'type-imports',
      },
    ],
    'no-restricted-imports': [
      'error',
      {
        patterns: ['./*', '../*', '~/*', '~~/*'],
      },
    ],
    'import/no-restricted-paths': [
      'error',
      {
        zones: [
          {
            from: [
              './src/components/page',
              './src/components/domain',
              './src/components/case',
            ],
            target: './src/components/base',
          },
          {
            from: ['./src/components/page', './src/components/domain'],
            target: './src/components/case',
          },
          {
            from: ['./src/components/page'],
            target: './src/components/domain',
          },
          {
            from: ['./src/stores'],
            target: './src/components/base',
          },
        ],
      },
    ],
    /* tailwindcss */
    'tailwindcss/no-custom-classname': [
      'warn',
      {
        config: 'tailwind.config.cjs',
      },
    ],
    'tailwindcss/classnames-order': 'off',
    /* vitest */
    'vitest/consistent-test-it': [
      'error',
      {
        fn: 'test',
      },
    ],
    'vitest/expect-expect': 'warn',
    'vitest/lower-case-title': 'off',
    'vitest/max-nested-describe': [
      'error',
      {
        max: 2,
      },
    ],
    'vitest/no-conditional-tests': 'error',
    'vitest/no-focused-tests': 'warn',
    'vitest/no-identical-title': 'error',
    'vitest/no-skipped-tests': 'warn',
  },
};
