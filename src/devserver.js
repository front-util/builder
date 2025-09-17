/**
 * @typedef {import('@rspack/core').DevServer} DevServer
 */
/**
 * Creates a module federation configuration.
 * @param {number} port - Partial module federation configuration.
 * @param {Partial<DevServer>} config - Partial module federation configuration.
 * @returns {DevServer} - Complete module federation configuration.
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