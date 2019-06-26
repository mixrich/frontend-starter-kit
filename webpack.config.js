/**
 * Общий для Development и Production окружения конфиг.
 */


const path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const extractCSS = new ExtractTextPlugin('[name].css');

module.exports = {
    entry: {
        common:  path.resolve(__dirname, './src/entry/common.js'),
        main:  path.resolve(__dirname, './src/entry/main.js')
    },
    output: {
        path: path.resolve(__dirname, 'dist/assets'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
            }, {
                test: /\.css/,
                use: extractCSS.extract({
                    use: [{
                        loader: "css-loader",
                        options: {
                            minimize: true,
                        }
                    }, "postcss-loader"]
                })
            }, {
                test: /\.scss/,
                use: extractCSS.extract({
                    use: [{
                        loader: "css-loader",
                        options: {
                            minimize: true,
                        }
                    }, "sass-loader", "postcss-loader"]
                })
            }, {
                test: /\.(jpg|jpeg|gif|png|svg)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            /* Все файлы менее чем limit (в байтах) будут инлайновыми. Все файлы крупнее limit будут обработаны через file-loader */
                            limit: 1024,
                            name: 'images/[name]-[hash:12].[ext]'
                        }
                    }
                ],
            }, {
                test: /\.(woff|woff2|eot|ttf)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024,
                            name: 'fonts/[name].[ext]'
                        }
                    }
                ],
            }
        ]
    },
    // optimization: {
    //     splitChunks: {
    //         chunks: 'all',
    //         minSize: 0
    //     }
    // },
    plugins: [
        extractCSS,
    ]
};
