import { createConfig, createDevServer } from '@front-utils/builder';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const packageDir = path.resolve(__dirname, '..');

export const createRspackConfig = ({ appDirName, port, config: extraConfig }) => {
    const isProduction = process.env.NODE_ENV === 'production';

    return createConfig(
        {
            rootDir: path.resolve(packageDir, '..', appDirName),
            env: { production: isProduction },
            appDirName,
        },
        {
            devServer: createDevServer(port),
            resolve: {
                alias: {
                    'react/jsx-runtime': 'react/jsx-runtime',
                },
            },
            ...extraConfig,
        },
    );
};
