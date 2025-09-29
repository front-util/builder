import plugin from '@module-federation/retry-plugin';

const RetryPlugin = plugin.RetryPlugin;

/**
 * Creates a retry plugin for module federation with optional custom options.
 * @param {import('../types/index.d.ts').RetryPluginOptions} [options] - Optional configuration options for the retry plugin.
 * @returns {any} The configured RetryPlugin instance.
 */
export const retryPlugin = (options = {}) => RetryPlugin({
    retryDelay: 1000,
    retryTimes: 5,
    onRetry   : ({times, url,}) => console.log('Retrying...', times, url),
    onSuccess : ({url,}) => console.log('Success', url),
    onError   : ({url,}) => console.log('Failed', url),
    ...options,
});
export default retryPlugin;
