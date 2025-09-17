import { ASSET_DIR_NAME } from './constants.js';

export const getModuleGenerator = () => {
    /** @type {import('@rspack/core').GeneratorOptionsByModuleType['css/auto']} */
    const cssGenRules = {
        exportsConvention: 'as-is',
        exportsOnly      : false,
        esModule         : true,
        ...process.env.NODE_ENV === 'production' && {
            localIdentName: 'gm-[local]-[hash:base64:6]',
        },
    };
    /** @type {import('@rspack/core').GeneratorOptionsByModuleType} */
    const generator = {
        'css/module': cssGenRules,
        'css/auto'  : cssGenRules,
    };

    return generator;
};

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
