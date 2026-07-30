import { ASSET_DIR_NAME } from './constants.js';

/** @typedef {import('../types/index.d.ts').GenerateFileNameOptions} GenerateFileNameOptions */

/**
 * Generates module generator options for CSS modules.
 * @returns {import('@rspack/core').GeneratorOptionsByModuleType} The generator options for CSS modules.
 */
export const getModuleGenerator = () => {
    /** @type {import('@rspack/core').CssGeneratorOptions} */
    const cssGenRules = {
        exportsConvention: 'as-is',
        exportsOnly      : false,
        esModule         : true,
    };

    if(process.env.NODE_ENV === 'production') {
        cssGenRules.localIdentName = 'app-[local]-[hash:base64:6]';
    }

    /** @type {import('@rspack/core').GeneratorOptionsByModuleType} */
    const generator = {
        'css/module': cssGenRules,
        'css/auto'  : { ...cssGenRules, },
    };

    return generator;
};

/**
 * Generates a filename for assets based on the provided options.
 * @param {GenerateFileNameOptions} options - The options for filename generation.
 * @returns {string|undefined} The generated filename or undefined in development.
 */
export const generateFileName = ({
    folder,
    ext,
    hashed = true,
    appName,
}) => {
    if(process.env.NODE_ENV !== 'production') {
        return;
    }

    const hashPrefix = hashed ? `${appName}.` : '';
    const hashSuffix = hashed ? '-[contenthash]' : '';
    const extension  = ext ?? '[ext]';

    return `${ASSET_DIR_NAME}/${folder}/${hashPrefix}[name]${hashSuffix}${extension}`;
};
