module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    // note you must disable the base rule as it can report incorrect errors
  "no-unused-vars": "off",
  '@typescript-eslint/no-unused-vars': [
    'warn', 
    { 
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_',
      caughtErrorsIgnorePattern: '^_',
    }]
  }
};
