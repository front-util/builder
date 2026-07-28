import { configs } from '@front-utils/linter';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';

export default defineConfig([
    {
        extends: configs.react,
        files: ['./src/**/*.{ts,tsx,js,jsx}'],
        rules: {
            'check-file/filename-naming-convention': [
                'error',
                { 'src/**/*.{ts,tsx,js,jsx}': 'CAMEL_CASE' },
                { ignoreMiddleExtensions: true },
            ],
            'import-x/no-unresolved': ['error', { ignore: ['^app2/'] }],
        },
    },
    {
        files: ['src/**/*.{ts,tsx}'],
        languageOptions: {
            parserOptions: {
                project: './tsconfig.json',
            },
        },
    },
    tseslint.configs.disableTypeChecked,
]);
