const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries');
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');
const autoprefixer = require('autoprefixer');
const purgecss = require('@fullhuman/postcss-purgecss');
const purgecssWordpress = require('purgecss-with-wordpress');
const { entryPoints } = require("./twk-boilerplate.config");



const outputPath = 'assets';

module.exports = (env, argv) => {

    const { mode } = argv;

    return {
        mode: mode,
        watch: true,
        devtool: mode === 'development' ? 'source-map' : false,
        externals: {
            jquery: "jQuery"
        },
        entry: entryPoints,
        output: {
            path: path.resolve(__dirname, outputPath),
            filename: 'js/[name].js',
        },
        plugins: [
            new WebpackBuildNotifierPlugin(),
            new FixStyleOnlyEntriesPlugin({silent: true}),
            new MiniCssExtractPlugin({
                filename: 'css/[name].css',
            }),

            // Uncomment this if you want to use CSS Live reload
            /*
            new BrowserSyncPlugin({
            proxy: localDomain,
            files: [ outputPath + '/*.css' ],
            injectCss: true,
            }, { reload: false, }),
            */
        ],
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader'
                },
                {
                    test: /\.s?[c]ss$/i,
                    use: [
                        MiniCssExtractPlugin.loader,
                        'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                postcssOptions: {
                                    plugins: [
                                        autoprefixer(),
                                        // purgecss({
                                        //     content: ['./**/*.html', './**/*.php'],
                                        //     css: ['**/*.css'],
                                        //     safelist: purgecssWordpress.safelist
                                        // })
                                    ],
                                },
                            }
                        },
                        'sass-loader'
                    ]
                },
                {
                    test: /\.(jpg|jpeg|png|gif|woff|woff2|eot|ttf|svg)$/i,
                    use: 'url-loader'
                }
            ]
        },
        node: {
            __filename: true,
            __dirname: true
        }
    }
};