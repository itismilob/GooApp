import prettier from 'eslint-config-prettier';
import reactNative from '@react-native/eslint-config';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  reactNative,
  prettier,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      parser: '@babel/eslint-parser',
      parserOptions: {
        requireConfigFile: false,
      },
    },
  },
]);
