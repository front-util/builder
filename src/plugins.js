import CompressionPlugin from 'compression-webpack-plugin';
import rspack from '@rspack/core'; 
import ReactRefreshPlugin from '@rspack/plugin-react-refresh';

export const getPlugins = (env) => {
    const isProduction = env.production;
    const appName = process.env.npm_package_name;
    const plugins = [
        new rspack.DefinePlugin({
            'process.env': JSON.stringify({
                RELEASE_VERSION: process.env.npm_package_version,
                BUILDTIME      : new Date().toLocaleString(),
                APP_NAME       : appName,
                NODE_ENV       : process.env.NODE_ENV,
            }),
        }),
        new rspack.HtmlRspackPlugin({
            hash: true,
            meta: {
                viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no',
            },
            templateContent: `
                <!DOCTYPE html>
                <html lang="ru">
                    <head>
                        <title>Геймификация ${appName}</title>
                        <meta charset="utf-8">
                    </head>
                    <body>
                        <noscript>
                            You need to enable JavaScript to run this app.
                        </noscript>
                        <div id="root"></div>
                    </body>
                </html>
                `,
        }),
        new rspack.CircularDependencyRspackPlugin({
            failOnError: true,
            exclude    : /node_modules/,
        })
    ];

    if(isProduction) {
        plugins.push(new CompressionPlugin({
            algorithm: 'gzip',
        }));
    } else {
        plugins.push(...[
            new ReactRefreshPlugin({
                overlay: true,
            }),
            new rspack.HotModuleReplacementPlugin()
        ]);
    }

    return plugins;
};
