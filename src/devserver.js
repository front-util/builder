/** @typedef {import('../types/index.d.ts').DevServerOptions} DevServerOptions */

/**
 * Creates a dev server configuration.
 * @param {number} port - The port number for the dev server.
 * @param {DevServerOptions} [config] - Additional dev server configuration options.
 * @returns {DevServer} The complete dev server configuration.
 */
export const createDevServer = (port, config) => ({
    port,
    client: {
        progress: true,
        logging : 'info',
    },
    headers: {
        'Access-Control-Allow-Origin' : '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
    },
    historyApiFallback: true,
    ...config,
}
);
