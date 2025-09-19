import { generateFileName } from './generator.js';

/** @typedef {import('../types/index.d.ts').Env} Env */

/**
 * Converts browser targets object to an array of target strings for SWC.
 * @param {Record<string, number>} [browserTargets] - Object with browser names as keys and minimum versions as values.
 * @returns {string[]} Array of target strings in the format 'browser >= version'.
 */
export const convertBrowserTargetsToSwcTargets = (browserTargets) => {
    if(!browserTargets || Object.keys(browserTargets).length === 0) {
        return ['chrome >= 84', 'safari >= 14.1'];
    }
    return Object.entries(browserTargets).map(([browser, version]) => `${browser} >= ${version}`);
};

/**
 * Generates an array of Rspack rules based on the environment and options.
 * @param {Env} env - The environment object.
 * @param {string} appName - The application name.
 * @param {Record<string, number>} [browserTargets] - Browser targets for SWC and CSS loaders.
 * @returns {RuleSetRule[]} An array of Rspack rules.
 */
export const getRules = (env, appName, browserTargets) => {
    const isProduction = env.production;

    return [
        {
            test: /\.tsx?$/,
            use : {
                loader : 'builtin:swc-loader',
                /** @type {import('@rspack/core').SwcLoaderOptions} */
                options: {
                    env: {
                        mode   : 'usage',
                        coreJs : '3.38.1',
                        targets: convertBrowserTargetsToSwcTargets(browserTargets),
                    },
                    isModule: 'unknown',
                    jsc     : {
                        parser: {
                            syntax: 'typescript',
                            tsx   : true,
                        },
                        transform: {
                            react: {
                                runtime    : 'automatic',
                                development: !isProduction,
                                refresh    : !isProduction,
                                pragma     : "React.createElement",
                                pragmaFrag : "React.Fragment",
                            },
                        },
                        experimental: {
                            plugins: [
                                [
                                    "@swc/plugin-styled-components",
                                    {
                                        displayName: !isProduction,
                                        ssr        : false,
                                        pure       : isProduction,
                                        namespace  : 'game',
                                        minify     : !isProduction,
                                    }

                                ]
                            ],
                        },
                        minify: {
                            compress: isProduction,
                        },
                    },
                    rspackExperiments: {
                        import: [
                            {
                                libraryName: '@mui/material',
                                customName : '@mui/material/{{ member }}',
                            },
                            {
                                libraryName: '@mui/icons-material',
                                customName : '@mui/icons-material/{{ member }}',
                            }
                        ],
                    },
                },
            },
            type: 'javascript/auto',
        },
        {
            test     : /\.(jpe?g|png|gif|webp)$/,
            type     : 'asset/resource',
            generator: {
                filename: generateFileName({folder: 'images', appName,}),
            },
        },
        {
            test: /\.svg$/,
            use : [
                {
                    loader : '@svgr/webpack',
                    options: {
                        prettier  : false,
                        svgo      : false,
                        svgoConfig: {
                            plugins: [{ removeViewBox: false, }],
                        },
                        titleProp: true,
                        ref      : true,
                    },
                },
                {
                    loader : 'file-loader',
                    options: {
                        name: generateFileName({folder: 'icons', ext: '.[ext]', appName,}),
                    },

                }
            ],
            issuer: {
                and: [/\.(ts|tsx|js|jsx|md|mdx)$/],
            },
        },
        {
            test: /\.css$/,
            use : [
                {
                    loader: 'builtin:lightningcss-loader',
                    ...browserTargets && {
                        /** @type {import('@rspack/core').LightningcssLoaderOptions} */
                        options: browserTargets,
                    },
                }
            ],
        },
        {
            test: /\.(woff2|woff|otf|ttf|eot)?$/,
            ...isProduction ? {
                type     : 'asset/resource',
                generator: {
                    filename: generateFileName({folder: 'fonts', hashed: false, appName,}),
                },
            } : {
                type: 'asset/inline',
            },
        }
    ];
};
