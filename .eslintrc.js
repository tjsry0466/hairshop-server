module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  settings: {
    'import/parsers': { '@typescript-eslint/parser': ['.ts'] },
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'unused-imports'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript',
    'plugin:import/recommended',
    'plugin:prettier/recommended',
    'plugin:promise/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: ['interface', 'typeAlias'],
        format: ['PascalCase'],
        prefix: ['I'],
      },
    ],
    'import/newline-after-import': ['error', { count: 1 }],
    'import/no-duplicates': ['error', { considerQueryString: true }],
    'import/first': 1,
    'import/named': 1,
    'import/order': [
      'error',
      {
        groups: [
          ['builtin', 'external'],
          ['parent', 'sibling', 'index'],
        ],
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        'newlines-between': 'always',
      },
    ],
    'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
    'no-console': 'error',
    '@typescript-eslint/no-unused-vars': 'off',
    // FIXME: nest 모듈이 지워지는 이슈가 있어 주석처리 합니다.
    // 'unused-imports/no-unused-imports': 'warn',
    // 'unused-imports/no-unused-vars': [
    //   'error',
    //   {
    //     vars: 'all',
    //     varsIgnorePattern: '^_',
    //     args: 'none',
    //     argsIgnorePattern: '^_',
    //     ignoreRestSiblings: true,
    //   },
    // ],
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: 'block-like', next: '*' },
    ],
  },
  overrides: [
    {
      files: ['error-messages.ts'],
      rules: {
        'prettier/prettier': 'off',
        'lines-between-class-members': ['error', 'never'],
      },
    },
  ],
};