/**
 * Конфигурация webpack для development окружения
 * @type {merge}
 */

const merge = require('webpack-merge');
const config = require('./webpack.config.js');

module.exports = merge(config, {
    devtool: 'cheap-inline-source-map',
    watch: false
});