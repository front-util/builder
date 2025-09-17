import path from 'path';
import { rspack } from '@rspack/core';
import { defineConfig } from '@rspack/cli';

import { fullWebpackAliases } from '../aliases.js';
import { getPlugins } from './plugins.js';
import { getRules } from './rules.js';
import { BASE_BUILD_PATH, browserTargets } from './constants.js';
import { getModuleGenerator, generateFileName } from './generator.js';

/**
 * @typedef {Object} Env
 * @property {boolean} [production] - Indicates if the environment is production.
 * @property {boolean} [development] - Indicates if the environment is development.
 */

/**
 * @param {{ rootDir: string, env: Env, appDirName: string }} options - The options object containing rootDir, env, and appDirName.
 */
export default ({ rootDir, env, appDirName, }) => {
    const isProduction = env.production;
    const plugins = getPlugins(env);
    const rules = getRules(env, appDirName);
    const generator = getModuleGenerator(env);

    return defineConfig({
        context        : rootDir,
        lazyCompilation: false,
        mode           : isProduction ? 'production' : 'development',
        entry          : path.resolve(rootDir, 'src', 'index'),
        output         : {
            uniqueName      : appDirName,
            path            : `${BASE_BUILD_PATH}/${appDirName}`,
            // publicPath      : isProduction ? `FRONT_ENDPOINT/${appDirName}/` : 'auto',
            publicPath      : 'auto',
            clean           : true,
            filename        : generateFileName({folder: 'js', ext: '.js', appName: appDirName, hashed: true,}),
            chunkFilename   : generateFileName({folder: 'js', ext: '.js', appName: appDirName, hashed: true,}),
            cssFilename     : generateFileName({folder: 'css', ext: '.css', appName: appDirName, hashed: true,}),
            cssChunkFilename: generateFileName({folder: 'css', ext: '.css', appName: appDirName, hashed: true,}),
        },
        target : 'web',
        devtool: isProduction ? 'source-map' : 'eval',
        ...isProduction && {
            optimization: {
                minimize   : true,
                splitChunks: {
                    maxSize           : 120000,
                    minSize           : 20000,
                    chunks            : 'async',
                    maxInitialRequests: 30,
                },
                minimizer: [
                    new rspack.SwcJsMinimizerRspackPlugin(),
                    new rspack.LightningCssMinimizerRspackPlugin({
                        targets: browserTargets,
                    })
                ],
            },
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.jsx', '.js'],
            alias     : fullWebpackAliases,
            tsConfig  : path.resolve(rootDir, './tsconfig.json'),
        },
        module: {
            rules,
            generator,
        },
        plugins,
        experiments: {
            css: true,
        },
    });
};
