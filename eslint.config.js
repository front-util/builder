import { configs } from '@front-utils/linter';
import { defineConfig } from "eslint/config";

export default defineConfig([
    { ignores: ['example/**'] },
    {
        files: ['./src/**/*.js'],
        extends: configs.js,
    },
])
