// eslint-disable-next-line import/no-unresolved
import { createModuleFederationConfig } from '@module-federation/enhanced/rspack';

/** @typedef {import('../types/index.d.ts').MFConfigOptions} MFConfigOptions */

/**
 * Creates a module federation configuration.
 * @param {Partial<ModuleFederationPluginOptions>} config - Partial module federation configuration.
 * @param {MFConfigOptions} options - Options for module federation configuration.
 * @returns {ModuleFederationPluginOptions} - Complete module federation configuration.
 */
export const createMFConfig = (config, options) => createModuleFederationConfig({
    name    : options.name,
    filename: 'remoteEntry.js',
    dts     : false,
    dev     : process.env.NODE_ENV !== 'production',
    ...config,
});
