import { defineConfig } from '@rspack/cli';
import { rspack } from '@rspack/core';
import path from 'node:path';
import { merge } from 'webpack-merge';

import { generateFileName, getModuleGenerator } from './generator.js';
import { getPlugins } from './plugins.js';
import { getRules } from './rules.js';

/** @typedef {import('../types/index.d.ts').ConfigOptions} ConfigOptions */
/** @typedef {import('../types/index.d.ts').Env} Env */

/**
 * @param {ConfigOptions} options - The configuration options.
 * @returns {Configuration} The rspack configuration object.
 */
export const baseConfig = ({
    rootDir,
    env,
    appDirName,
    browserTargets,
    aliases,
    buildPath = `${rootDir}/dist`,
    overlay = true,
}) => {
    const isProduction = env.production;
    const plugins = getPlugins(env, overlay);
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
                minimize              : true,
                removeAvailableModules: true,
                splitChunks           : {
                    maxSize           : 120_000,
                    maxAsyncSize      : 120_000,
                    minSize           : 40_000,
                    chunks            : 'all',
                    maxInitialRequests: 30,
                    maxAsyncRequests  : 30,
                    cacheGroups       : {
                        defaultVendors: {
                            test              : /[\\/]node_modules[\\/]/,
                            priority          : -10,
                            reuseExistingChunk: true,
                            filename          : `assets/js/${appDirName}-libs-[name].js`,
                        },
                        default: {
                            minChunks         : 2,
                            priority          : -20,
                            reuseExistingChunk: true,
                        },
                    },
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
            alias     : {
                'react/jsx-runtime': 'react/jsx-runtime.js',
                ...aliases,
            },
            tsConfig: path.resolve(rootDir, './tsconfig.json'),
        },
        module: {
            rules,
            generator,
        },
        plugins,
        experiments: {
            css                  : true,
            parallelCodeSplitting: true,
        },
    });
};

/**
 * Creates a merged Rspack configuration by combining base config with custom config.
 * @param {ConfigOptions} params - The base configuration parameters.
 * @param {Partial<Configuration>} config - Additional configuration to merge.
 * @returns {Configuration} The merged Rspack configuration.
 */
export const createConfig = (params, config) => merge(baseConfig(params), config);
