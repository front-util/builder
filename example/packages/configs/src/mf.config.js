import { createMFConfig } from '@front-utils/builder';
import { ModuleFederationPlugin } from '@module-federation/enhanced/rspack';

export const createMFPlugin = (config, options) => {
    const mfOptions = createMFConfig(
        {
            shared: {
                react: { singleton: true },
                'react-dom': { singleton: true },
            },
            ...config,
        },
        { retry: true, ...options },
    );

    return new ModuleFederationPlugin(mfOptions);
};
