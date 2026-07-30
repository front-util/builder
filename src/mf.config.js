import { createModuleFederationConfig } from '@module-federation/enhanced/rspack';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @typedef {import('../types/index.d.ts').MFConfigOptions} MFConfigOptions */

/**
 * Creates a module federation configuration.
 * @param {Partial<ModuleFederationPluginOptions>} config - Partial module federation configuration.
 * @param {MFConfigOptions} options - Options for module federation configuration.
 * @returns {ModuleFederationPluginOptions} - Complete module federation configuration.
 */
export const createMFConfig = (config, options) => {
    const experiments = {
        asyncStartup: true,
        optimization: {
            target: 'web',
        },
        ...options.useManagers && {
            managers: {
                eager: false,
            },
        },
        ...config.experiments,
    };

    return createModuleFederationConfig({
        name         : options.name,
        filename     : 'remoteEntry.js',
        shareStrategy: 'loaded-first',
        dts          : false,
        dev          : process.env.NODE_ENV !== 'production',
        experiments,
        ...options.shared && {
            shared: options.shared,
        },
        ...(options.retry && {
            runtimePlugins: [
                path.resolve(__dirname, './mf.retry-plugin.js')
            ],
        }),
        ...config,
    });
};
