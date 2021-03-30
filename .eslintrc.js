module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      tsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    quotes: [2, 'single', { avoidEscape: true }],
    'no-console': 1,
    'react/jsx-uses-vars': 2,
    'react/prop-types': 0,
    'import/newline-after-import': [2],
    'import/order': [2, { groups: [['builtin', 'external', 'internal']] }],
    'import/no-duplicates': 2,
    '@typescript-eslint/naming-convention': [
      2,
      {
        selector: 'interface',
        format: ['PascalCase'],
        custom: {
          regex: '^I[A-Z]',
          match: true,
        },
      },
    ],
    '@typescript-eslint/explicit-function-return-type': [
      1,
      { allowExpressions: true },
    ],
    '@typescript-eslint/no-unused-vars': [2],
    'arrow-parens': ['error', 'as-needed'],
  },
  settings: {
    react: {
      version: require('react/package.json').version,
    },
  },
};
