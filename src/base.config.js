import path from 'path';
import { rspack } from '@rspack/core';
import { defineConfig } from '@rspack/cli';

import { getPlugins } from './plugins.js';
import { getRules } from './rules.js';
import { getModuleGenerator, generateFileName } from './generator.js';

/**
 * @typedef {Object} Env
 * @property {boolean} [production] - Indicates if the environment is production.
 * @property {boolean} [development] - Indicates if the environment is development.
 */

/**
 * @typedef {Object} ConfigOptions
 * @property {string} rootDir - The root directory of the project.
 * @property {Env} env - The environment settings.
 * @property {string} appDirName - The name of the app directory.
 * @property {Object} [browserTargets] - Browser targets for CSS minimization.
 * @property {Object} [aliases] - Module aliases for resolve.
 * @property {string} [buildPath] - The build output path. Defaults to `${rootDir}/dist`.
 */

/**
 * @param {ConfigOptions} options - The configuration options.
 * @returns {Object} The rspack configuration object.
 */
export const baseConfig = ({
    rootDir, 
    env, 
    appDirName, 
    browserTargets,
    aliases,
    buildPath = `${rootDir}/dist`,
}) => {
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
            path            : buildPath,
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
                        ...browserTargets && {
                            targets: browserTargets,
                        },
                    })
                ],
            },
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.jsx', '.js'],
            alias     : aliases,
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
