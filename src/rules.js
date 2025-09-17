import { browserTargets } from './constants.js';

import { generateFileName } from './generator.js';

export const getRules = (env, appName) => {
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
                        targets: [
                            'chrome >= 84',
                            'safari >= 14.1'
                        ],
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
                    loader : 'builtin:lightningcss-loader',
                    /** @type {import('@rspack/core').LightningcssLoaderOptions} */
                    options: browserTargets,
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
