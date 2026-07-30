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
                    app3: 'app3@http://localhost:3002/remoteEntry.js',
                },
            }),
        ],
    },
});
