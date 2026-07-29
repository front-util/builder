// @ts-check
import { defineConfig } from '@rspack/cli';
import { rspack } from '@rspack/core';
import path from 'node:path';
import { merge } from 'webpack-merge';

import { generateFileName, getModuleGenerator } from './generator.js';
import { getPlugins } from './plugins.js';
import { getRules } from './rules.js';
import { getSplitChunksSettings } from './splitchunks.js';

/** @typedef {import('../types/index.d.ts').ConfigOptions} ConfigOptions */
/** @typedef {import('../types/index.d.ts').Env} Env */
/** @typedef {import('@rspack/core').Configuration} Configuration */

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
    useSplitChunks = true,
}) => {
    const isProduction = env.production;
    const plugins = getPlugins(env);
    const rules = getRules(env, appDirName, browserTargets);
    const generator = getModuleGenerator();

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
            filename        : generateFileName({ folder: 'js', ext: '.js', appName: appDirName, hashed: true, }),
            chunkFilename   : generateFileName({ folder: 'js', ext: '.js', appName: appDirName, hashed: true, }),
            cssFilename     : generateFileName({ folder: 'css', ext: '.css', appName: appDirName, hashed: true, }),
            cssChunkFilename: generateFileName({ folder: 'css', ext: '.css', appName: appDirName, hashed: true, }),
        },
        target : 'web',
        devtool: isProduction ? 'source-map' : 'eval',
        ...isProduction && {
            optimization: {
                minimize : true,
                minimizer: [
                    new rspack.SwcJsMinimizerRspackPlugin(),
                    new rspack.LightningCssMinimizerRspackPlugin()
                ],
                chunkIds    : 'deterministic',
                runtimeChunk: 'single',
                ...(useSplitChunks && {
                    splitChunks: getSplitChunksSettings(appDirName),
                }),
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
    });
};

/**
 * Creates a merged Rspack configuration by combining base config with custom config.
 * @param {ConfigOptions} params - The base configuration parameters.
 * @param {Partial<Configuration>} config - Additional configuration to merge.
 * @returns {Configuration} The merged Rspack configuration.
 */
export const createConfig = (params, config) => merge(baseConfig(params), config);
