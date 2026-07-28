import { RsdoctorRspackPlugin } from '@rsdoctor/rspack-plugin';
import rspack from '@rspack/core';
import ReactRefreshPlugin from '@rspack/plugin-react-refresh';
import CompressionPlugin from 'compression-webpack-plugin';

/** @typedef {import('../types/index.d.ts').Env} Env */
/** @typedef {import('@rspack/core').Plugin} Plugin */

/**
 * Generates an array of Rspack plugins based on the environment.
 * @param {Env} env - The environment object.
 * @param {boolean} [overlay=true] - Whether to show overlay for React Refresh.
 * @returns {Plugin[]} An array of Rspack plugins.
 */
// eslint-disable-next-line unicorn/consistent-boolean-name
export const getPlugins = (env, overlay = true) => {
    const isProduction = env.production;
    const appName = process.env.npm_package_name;
    const plugins = [
        new rspack.DefinePlugin({
            'process.env.RELEASE_VERSION': JSON.stringify(process.env.npm_package_version),
            'process.env.BUILDTIME'      : JSON.stringify(new Date().toLocaleString()),
            'process.env.APP_NAME'       : JSON.stringify(appName),
            'process.env.NODE_ENV'       : JSON.stringify(process.env.NODE_ENV),
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
                        <title>${appName}</title>
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

    if(process.env.RSDOCTOR) {
        plugins.push(new RsdoctorRspackPlugin());
    }
    if(isProduction) {
        plugins.push(new CompressionPlugin({
            algorithm: 'gzip',
        }));
    }
    else {
        plugins.push(
            new ReactRefreshPlugin({
                overlay,
            }),
            new rspack.HotModuleReplacementPlugin()
        );
    }

    return plugins;
};
