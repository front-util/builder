import { createModuleFederationConfig } from '@module-federation/enhanced/rspack';

const SHARE_SCOPE = 'gameScope';

export const getSharedModules = (deps) => {
    const shared = {
        react: {
            requiredVersion: deps['react'],
            singleton      : true,
        },
        'react-dom': {
            requiredVersion: deps['react-dom'],
            singleton      : true,
        },
        '@admiral-ds/fonts': {
            requiredVersion: deps['@admiral-ds/fonts'],
            singleton      : true,
        },
        '@emotion/react': {
            requiredVersion: deps['@emotion/react'],
            singleton      : true,
        },
        '@emotion/styled': {
            requiredVersion: deps['@emotion/styled'],
            singleton      : true,
        },
        '@mui/styled-engine-sc': {
            requiredVersion: deps['@mui/styled-engine-sc'],
            singleton      : true,
            shareScope     : SHARE_SCOPE,
        },
        '@popperjs/core': {
            requiredVersion: deps['@popperjs/core'],
            singleton      : true,
            shareScope     : SHARE_SCOPE,
        },
        '@sinclair/typebox': {
            singleton: true,
        },
        'dompurify': {
            requiredVersion: false,
            singleton      : true,
        },
        'immer': {
            requiredVersion: deps['immer'],
            singleton      : true,
        },
        'styled-components': {
            requiredVersion: deps['styled-components'],
            singleton      : true,
        },
        'zustand': {
            requiredVersion: deps['zustand'],
            singleton      : true,
            shareScope     : SHARE_SCOPE,
        },
        '@front-utils/react-hooks': {
            requiredVersion: deps['@front-utils/react-hooks'],
            singleton      : true,
        },
        '@front-utils/request': {
            requiredVersion: deps['@front-utils/request'],
            singleton      : true,
        },
        '@front-utils/utils': {
            requiredVersion: deps['@front-utils/utils'],
            singleton      : true,
        },
        '@vtb-personal-area/common': {
            requiredVersion: deps['@vtb-personal-area/common'],
            singleton      : true,
        },
        '@vtb-personal-area/api': {
            requiredVersion: deps['@vtb-personal-area/api'],
            singleton      : true,
        },
    };

    return Object.fromEntries(
        Object.entries(shared).filter(([key]) => deps[key])
    );
};

/**
 * @typedef {import('@rspack/core').ModuleFederationPluginOptions} ModuleFederationPluginOptions
 */
/**
 * @typedef {Object} MFConfigOptions
 * @property {string} name - The name of the module federation configuration.
 * @property {Object.<string, string>} [deps] - Dependencies with their versions.
 */
/**
 * Creates a module federation configuration.
 * @param {Partial<ModuleFederationPluginOptions>} config - Partial module federation configuration.
 * @param {MFConfigOptions} options - Options for module federation configuration.
 * @returns {ModuleFederationPluginOptions} - Complete module federation configuration.
 */
export const createMFConfig = (config, options) => createModuleFederationConfig({
    name    : options.name,
    shared  : getSharedModules(options.deps ?? {}),
    filename: 'remoteEntry.js',
    dts     : false,
    dev     : process.env.NODE_ENV !== 'production',
    ...config,
});