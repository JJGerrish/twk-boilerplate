const path = require("path");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const WebpackBuildNotifierPlugin = require("webpack-build-notifier");

//const mode = process = 'dev' ? 'development' : 'production';

module.exports = (env, argv) => {
    const { mode } = argv;

    return {
        mode: mode,
        watch: true,
        devtool: mode === "development" ? "source-map" : false,
        externals: {
            jquery: "jQuery"
        },
        entry: {
            main: "./assets/js/script.js"
        },
        plugins: [
            new WebpackBuildNotifierPlugin(),
            ...(mode === "development"
                ? []
                : [new UglifyJSPlugin({ sourceMap: false })])
        ],
        output: {
            path: path.resolve(__dirname, "assets"),
            filename: "js/bundle.min.js"
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: "babel-loader"
                }
            ]
        },
        optimization: {
            minimize: false
        }
    };
};
