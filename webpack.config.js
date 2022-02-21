const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');

module.exports = {
    entry: {
        main: './src/main.js',
    },
    output: {
        path: path.resolve((__dirname, 'dist')),
        filename: './js/[name].js',
        clean: true,
    },
    devtool: 'source-map',
    loader: {},
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader'],
            },
            {
                test: /\.less$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'less-loader'],
            },
            {
                test: /\.(sass|scss)$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader'],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'images/[name]_[contenthash:6][ext]',
                },
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset',
                parser: {
                    dataUrlCondition: {
                        maxSize: 16 * 1024,
                    },
                },
            },
            {
                test: /\.(html|htm)$/i,
                loader: 'html-loader',
            },
            {
                test: /\.ttf$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'icon/[name][ext]',
                },
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset',
                generator: {
                    filename: 'icon/[name][ext]',
                },
            },
            {
                test: /\.js$/i,
                exclude: /(node_modules|img)/,
                loader: 'eslint-loader',
                options: {
                    fix: true,
                },
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            chunks: ['main'],
            template: './src/index.html',
            filename: 'index.html',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
            },
            inject: 'body',
        }),
        new MiniCssExtractPlugin({
            filename: './css/[name].css',
        }),

    ],
    optimization: {
        minimizer: [
            new CssMinimizerWebpackPlugin({
                minimizerOptions: {
                    preset: [
                        'default',
                        {
                            discardComments: { removeAll: true },
                        },
                    ],
                },
            }),
        ],
        minimize: true,
    },
    mode: 'development',
    devServer: {
        static: './dist',
        client: {
            overlay: false,
        },
        hot: true,
    },
};
