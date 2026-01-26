export const getSplitChunksSettings = (appDirName) => ({
    maxSize           : 200_000,
    maxAsyncSize      : 200_000,
    minSize           : 100_000,
    chunks            : 'all',
    maxInitialRequests: 30,
    maxAsyncRequests  : 30,
    cacheGroups       : {
        defaultVendors: {
            test              : /[\\/]node_modules[\\/]/,
            priority          : -10,
            reuseExistingChunk: true,
            filename          : `assets/js/${appDirName}-libs-[name].js`,
        },
        default: {
            minChunks         : 2,
            priority          : -20,
            reuseExistingChunk: true,
        },
    },
});