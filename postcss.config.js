/**
 * Конфигурация POSTCSS плагинов для webpack.
 * PostCss-loader автоматически подхватит ее.
 * @type {[string,string,string,string,string,string,string,string]}
 */

const AUTOPREFIXER_BROWSERS = [
    'Android 2.3',
    'Android >= 4',
    'Chrome >= 39',
    'Firefox >= 38',
    'Explorer >= 7',
    'iOS >= 7',
    'Opera >= 12',
    'Safari >= 5'
];

module.exports = {
    plugins: [
        require('postcss-inline-svg')({}),
        require('autoprefixer')({
            browsers: AUTOPREFIXER_BROWSERS
        })
    ]
};
