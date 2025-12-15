import { configs } from '@front-utils/linter';
import { defineConfig } from "eslint/config";

export default defineConfig({
    files: ['./src/**/*.js'],
    extends        : configs.js,
})
