import globals from 'globals';
import tseslint from 'typescript-eslint';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  { files: ['**/*.js'], languageOptions: { sourceType: 'commonjs' } },
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    languageOptions: { globals: globals.browser },
    rules: {
      // 사용하지 않는 _로 시작하는 변수 무시하도록 설정
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_' },
      ],
    },
  },
  tseslint.configs.recommended,
]);
