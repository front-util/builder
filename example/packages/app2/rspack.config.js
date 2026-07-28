import { createRspackConfig, createMFPlugin } from '@example/configs';

export default createRspackConfig({
    appDirName: 'app2',
    port: 3001,
    config: {
        plugins: [
            createMFPlugin({
                name: 'app2',
                exposes: {
                    './RemotePage': './src/components/remotePage.tsx',
                },
            }),
        ],
    },
});
