/**
 * Generates split chunks settings for Rspack optimization.
 * Uses 'async' chunk mode by default to avoid pulling modules out of
 * Module Federation remote entries into shared vendor chunks.
 *
 * @param {string} appDirName - The application directory name.
 * @returns {import('@rspack/core').OptimizationSplitChunksOptions} The split chunks configuration.
 */
export const getSplitChunksSettings = (appDirName) => ({
    maxSize           : 600_000,
    maxAsyncSize      : 400_000,
    minSize           : 200_000,
    chunks            : 'async',
    maxInitialRequests: 20,
    maxAsyncRequests  : 15,
    cacheGroups       : {
        defaultVendors: {
            test              : /[\\/]node_modules[\\/]/,
            priority          : -10,
            reuseExistingChunk: true,
            filename          : `assets/js/${appDirName}-libs-[name].js`,
        },
        monorepoShared: {
            test              : /[\\/]packages[\\/]/,
            priority          : -5,
            reuseExistingChunk: false,
            minChunks         : 2,
            name(module) {
                const match = module.identifier().match(
                    /[\\/]packages[\\/]([^\\/]+)/
                );

                return match ? `mono-${match[1]}` : 'mono-other';
            },
            filename: `assets/js/${appDirName}-[name].js`,
        },
        default: {
            minChunks         : 2,
            priority          : -20,
            reuseExistingChunk: true,
        },
    },
});
