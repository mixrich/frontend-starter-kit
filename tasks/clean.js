'use strict';

const del = require('del');

/**
 * Очистка build директории
 * @param options
 * @returns {Function}
 */
module.exports = function(options) {
    return del([options.dist]);
};