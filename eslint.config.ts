import tseslint from 'typescript-eslint';
import playwright from 'eslint-plugin-playwright';
import jsdoc from 'eslint-plugin-jsdoc';

export default [
  ...tseslint.configs.strictTypeChecked,
  {
    plugins: {
      jsdoc
    },
    rules: {
      'jsdoc/check-tag-names': ['error', { definedTags: ['selector', 'strategy', 'verified', 'reason'] }],
      // Ignore unused vars when starting with underscore
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      '@typescript-eslint/restrict-template-expressions': ['error', { allowNumber: true }]
    },
  },
  {
    // Mandatory JSDoc for Core Framework and CLI
    files: ['scripts/**/*.ts', 'mcp/**/*.ts', 'mcp/server.ts'],
    plugins: { jsdoc },
    rules: {
      'jsdoc/require-jsdoc': ['error', { 
        require: { 
          FunctionDeclaration: true, 
          MethodDefinition: true 
        },
        contexts: ['ExportDefaultDeclaration', 'ExportNamedDeclaration'] 
      }],
      'jsdoc/require-description': 'error',
      'jsdoc/require-param-description': 'error',
      'jsdoc/require-returns-description': 'error',
    }
  },
  {
    ...playwright.configs['flat/recommended'],
    files: ['**/*.spec.ts'],
    rules: {
      ...playwright.configs['flat/recommended'].rules,
      'playwright/no-raw-locators': 'error',     // forbid page.locator() in specs
      'playwright/prefer-web-first-assertions': 'error',
      'playwright/no-wait-for-timeout': 'error', // Ban hard waits
      'playwright/no-focused-test': 'error',    // Ban test.only and describe.only
      'playwright/no-skipped-test': 'warn',     // Detect test.skip (Warning)
    },
  },
  {
    languageOptions: {
      parserOptions: { project: true }
    }
  }
];
