import { utils } from '@front-utils/linter';
import { defineConfig } from "eslint/config";

export default defineConfig({
    files: ['./src/**/*.js'],
    extends: utils.createEslintConfig()
})
