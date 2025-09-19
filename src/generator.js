import { ASSET_DIR_NAME } from './constants.js';

/**
 * Generates module generator options for CSS modules.
 * @returns {import('@rspack/core').GeneratorOptionsByModuleType} The generator options for CSS modules.
 */
export const getModuleGenerator = () => {
    /** @type {import('@rspack/core').GeneratorOptionsByModuleType['css/auto']} */
    const cssGenRules = {
        exportsConvention: 'as-is',
        exportsOnly      : false,
        esModule         : true,
        ...process.env.NODE_ENV === 'production' && {
            localIdentName: 'app-[local]-[hash:base64:6]',
        },
    };
    /** @type {import('@rspack/core').GeneratorOptionsByModuleType} */
    const generator = {
        'css/module': cssGenRules,
        'css/auto'  : cssGenRules,
    };

    return generator;
};

/**
 * Generates a filename for assets based on the provided options.
 * @param {Object} options - The options for filename generation.
 * @param {string} options.folder - The folder name for the asset.
 * @param {string} [options.ext] - The file extension.
 * @param {boolean} [options.hashed=true] - Whether to include content hash in the filename.
 * @param {string} options.appName - The application name.
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

    return `${ASSET_DIR_NAME}/${folder}/${hashed ? `${appName}.` : ''}[name]${hashed ? '-[contenthash]' : ''}${ext ?? '[ext]'}`;
};
