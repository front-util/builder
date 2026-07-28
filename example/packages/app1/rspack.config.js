import { createRspackConfig, createMFPlugin } from '@example/configs';

export default createRspackConfig({
    appDirName: 'app1',
    port: 3000,
    config: {
        plugins: [
            createMFPlugin({
                name: 'app1',
                remotes: {
                    app2: 'app2@http://localhost:3001/remoteEntry.js',
                },
            }),
        ],
    },
});
